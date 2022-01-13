<script>
    const form = {};

    const sendMail = async() => {
        console.log(form);
        await fetch('/api/mailer', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
            method: 'POST'
        }).then((res) => {
            if (res.ok) {
                return res;
            }
            throw res;
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
                <input type="email" bind:value={form.emailAddress} placeholder="Email" />
                <input type="phone" bind:value={form.phone} placeholder="Phone" />
            </div>
            <div class="section">
                <textarea name="text" placeholder="Message"></textarea>
            </div>
            <button type="button" class="submit" on:click={sendMail}>Send</button>
        </form>
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
    }

    .container {
        margin: auto;
    }

    .form {
        border: 1px solid black;
        border-radius: 10px;
        box-shadow: 0 0 40px var(--shadow-color);
        padding: 20px;
        width: 500px;
        margin: auto;
        display: grid;
        gap: 20px;
        position: relative;
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