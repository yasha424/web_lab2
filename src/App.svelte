<script>
    // import sanitizeHtml from 'sanitize-html';

    const form = {};
    let is_error = false;
    let error = "";

    const sendMail = async() => {
        form.message = document.querySelector('.section .message');
        console.log(form.message.value);

        if (!form.firstName) {
            is_error = true;
            error = "First name cannot be empty";
            return;
        }
        else if (!form.lastName) {
            is_error = true;
            error = "Last name cannot be empty";
            return;
        }
        else if (!(/^[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(form.email))){
            is_error = true;
            error = "Invalid email address";
            return;
        } else if (!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(form.phone))) {
            is_error = true;
            error = "Invalid phone format";
            return;
        } else if (!form.message.value) {
            is_error = true;
            error = "Message cannot be empty";
            return;
        }

        is_error = false;
        error = '';

        await fetch('/api/mailer', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: form,
            method: 'POST'
        }).then((res) => {
            console.log(res);
        });
    };
</script>

<main>
    <div class="container">
        <form class="form">
            <span class="header">Email form</span>
            <div class="section">
                <input type="text" bind:value={form.firstName} placeholder="First name" />
                <input type="text" bind:value={form.lastName} placeholder="Last name" />
            </div>
            <div class="section">
                <input type="email" bind:value={form.email} placeholder="Email" />
                <input type="phone" bind:value={form.phone} placeholder="Phone" />
            </div>
            <div class="section">
                <textarea name="text" class="message" placeholder="Message"></textarea>
            </div>
            <button type="button" class="submit" on:click={sendMail}>Send</button>
        </form>
        {#if is_error}
            <div class="notify-error">{error}</div>
        {/if}
    </div>
</main>

<style>
    :root {
        --btn-color: #35a840;
        --btn-hover-color: #55c860;
        --btn-border-color: #222;
        --text-color: #000;
        --shadow-color: rgba(10, 10, 10, 0.2);
        --input-color: rgb(230, 230, 230);
        --btn-transition: ease 0.3s;
        --border-color: #ddd;
        --error-color: #e11;
    }

    .container {
        margin: auto;
    }

    .form {
        border: 1px solid var(--border-color);
        border-radius: 8px;
        box-shadow: 0 0 40px var(--shadow-color);
        padding: 20px;
        width: 500px;
        margin: auto;
        display: grid;
        gap: 20px;
        position: relative;
    }

    .notify-error {
        width: 500px;
        padding: 20px 20px;
        margin: 10px auto auto auto;
        font-size: 18px;
        text-align: center;
        background-color: var(--error-color);
        box-shadow: 0 0 40px var(--shadow-color);
        /*margin-top: 10px;*/
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
        border: 1px solid var(--btn-border-color);
    }
</style>