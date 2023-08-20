export function html({ name, text, from }) {
    return `
        <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: capitalize; color: teal;">${name} lhe enviou um email</h2>
            <p>${text}</p>
            <p>My email: ${from}</p>
        </div>
    `
}