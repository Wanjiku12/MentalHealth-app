function sendMail(){
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    }

    emailjs.send("service_7xz2zs7", "template_ipqz1kb", params).then(() => alert("Email Sent!"))
}