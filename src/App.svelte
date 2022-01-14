<script>
    import { Moon } from 'svelte-loading-spinners';
    let form = {};
    let error = '';
    let showSpinner = false;
    let successSend = false;
    let isOnline = true;

    window.onoffline = () => {
        isOnline = false;
        error = '';
    }

    window.ononline = () => {
        isOnline = true;
    }

    const sendMail = async() => {
        successSend = false;
        let formData = {};
        Array.from(form.elements)
            .forEach((e) => {
                formData[e.name] = e.value;
            });
        if (!form.firstName.value) {
            error = "First name cannot be empty";
            return;
        }
        else if (!form.lastName.value) {
            error = "Last name cannot be empty";
            return;
        }
        else if (!(/^[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(form.email.value))){
            error = "Invalid email address";
            return;
        } else if (!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(form.phone.value))) {
            error = "Invalid phone format";
            return;
        } else if (!form.message.value) {
            error = "Message cannot be empty";
            return;
        }

        form.reset();
        error = '';
        showSpinner = true;

        try {
            await fetch('/api/mailer', {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                method: 'POST'
            }).then((res) => {
                showSpinner = false;
                if (res.ok) {
                    successSend = true;
                    return res;
                } else {
                    throw res;
                }
            });
        } catch (e) {
            if (e.status === 429) {
                error = 'Too many requests. Try again later';
            } else if (e.status >= 500) {
                error = 'Server error';
            } else if (e.status === 404) {
                error = 'Cannot connect to server';
            } else {
                error = e.message;
            }
        } finally {
            showSpinner = false;
        }
    };
</script>

<main>
    <div class="container">
        <form class="form" bind:this={form}>
            <span class="header">Email form</span>
            <div class="section">
                <input name="firstName" type="text" placeholder="First name" />
                <input name="lastName" type="text" placeholder="Last name" />
            </div>
            <div class="section">
                <input name="email" type="email" placeholder="Email" />
                <input name="phone" type="phone" placeholder="Phone" />
            </div>
            <div class="section">
                <textarea name="message" class="message" placeholder="Message"></textarea>
            </div>
            {#if isOnline}
                <button type="button" class="submit" on:click={sendMail}>Send</button>
            {:else}
                <button type="button" class="submit-offline">Send</button>
            {/if}
        </form>
        {#if !isOnline}
            <div class="notify-error">You need to be online</div>
        {:else if error != ''}
            <div class="notify-error">{error}</div>
        {:else if successSend}
            <div class="notify-success">Message sent successfully</div>
        {:else if showSpinner}
            <div class="spinner">
                <Moon />
            </div>
        {/if}
    </div>
</main>

<style>
    :root {
        --btn-color: #1e1;
        --btn-hover-color: #3f3;
        --text-color: #000;
        --shadow-color: rgba(10, 10, 10, 0.2);
        --input-color: rgb(230, 230, 230);
        --btn-transition: ease 0.3s;
        --border-color: #ddd;
        --error-color: #e11;
        --success-color: #1e1;
        --spinner-background-color: rgba(255, 255, 255, 0.6);
    }

    .container {
        margin: auto;
    }

    .form {
        border: 1px solid var(--border-color);
        border-radius: 8px;
        box-shadow: 0 0 40px var(--shadow-color);
        padding: 20px;
        width: 450px;
        margin: auto;
        display: grid;
        gap: 20px;
        position: relative;
    }

    .notify-success {
        width: 450px;
        padding: 20px 20px;
        margin: 10px auto auto auto;
        font-size: 18px;
        text-align: center;
        background-color: var(--success-color);
        box-shadow: 0 0 40px var(--shadow-color);
        border: 1px solid var(--border-color);
        border-radius: 8px;
    }

    .notify-error {
        width: 450px;
        padding: 20px 20px;
        margin: 10px auto auto auto;
        font-size: 18px;
        text-align: center;
        background-color: var(--error-color);
        box-shadow: 0 0 40px var(--shadow-color);
        border: 1px solid var(--border-color);
        border-radius: 8px;
    }

    .form .header {
        font-size: 24px;
        font-weight: bold;
        margin: auto;
    }

    .form .section {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .form input, .form textarea {
        background-color: var(--input-color);
        border: none;
        border-radius: 8px;
        padding: 10px;
    }

    .form textarea {
        height: 200px;
        width: 100%;
        resize: none;
    }

    .form .submit {
        cursor: pointer;
        width: 100px;
        background-color: var(--btn-color);
        color: var(--text-color);
        margin: auto;
        padding: 8px;
        border: 1px solid transparent;
        border-radius: 8px;
    }

    .form .submit:hover {
        transition: var(--btn-transition);
        background-color: var(--btn-hover-color);
        border: 1px solid var(--btn-color);
    }

    .form .submit-offline {
        cursor: not-allowed;
        width: 100px;
        background-color: var(--btn-color);
        color: var(--text-color);
        margin: auto;
        padding: 8px;
        border: 1px solid transparent;
        border-radius: 8px;
    }

    .spinner {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--spinner-background-color);
    }

    @media screen and (max-width: 546px) {
        .form {
            width: 90%;
            min-width: 200px;
            margin: auto;
            padding: 0;
            gap: 0;
        }

        .form .header {
            padding: 10px 0;
        }

        .form .section {
            width: 90%;
            display: grid;
            margin: auto;
            justify-content: normal;
        }

        .form input, .section textarea {
            background-color: var(--input-color);
            width: 100%;
        }

        .form .submit {
            margin: 10px auto;
        }

        .form .submit-offline {
            margin: 10px auto;
        }

        .notify-success {
            width: 80%;
        }

        .notify-error {
            width: 80%;
        }
    }
</style>
