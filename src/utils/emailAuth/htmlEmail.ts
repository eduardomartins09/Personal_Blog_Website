export function html({ url, text }) {
    return `
        <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: capitalize; color: teal;">Welcome to the Dev-Edu</h2>
            <p>
                Congratulations! You're almost set up. Just Click the button below.
            </p>
            
            <a href=${url} style="background-color: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a>

            <p>If button dont work, click link below:</p>

            <div>${url}</div>
        </div>
    `
}