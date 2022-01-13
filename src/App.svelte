<script>

</script>

<main>
    <div class="container">
        <form class="form">
            <span class="header">Email form</span>
            <div class="section">
                <input type="text" name="firstname" placeholder="First name" />
                <input type="text" name="lastname" placeholder="Last name" />
            </div>
            <div class="section">
                <input type="email" name="email" placeholder="Email" />
                <input type="phone" name="phone" placeholder="Phone" />
            </div>
            <div class="section">
                <textarea name="text" placeholder="Message"></textarea>
            </div>
            <button class="submit">Send</button>
        </form>
    </div>
</main>

<style>
    :root {
        --btn-color: #35a840;
        --btn-hover-color: #55c860;
        --text-color: #000;
        --shadow-color: rgba(10, 10, 10, 0.2);
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
        margin: auto;
    }


    .form .section {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .form input, .form textarea, .form .submit {
        background-color: rgb(230, 230, 230);
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
        width: 80px;
        background-color: var(--btn-color);
        color: var(--text-color);
        margin: auto;
        user-select: none;
    }

    .form .submit:hover {
        transition: ease 0.3s;
        background-color: var(--btn-hover-color);
    }
</style>