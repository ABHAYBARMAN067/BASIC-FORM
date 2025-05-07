document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        rollnumber: parseInt(document.getElementById('rollnumber').value),
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value
    };

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            alert('Registration successful!');
            this.reset(); // Reset form after successful submission
        } else {
            alert(result.error || 'Registration failed!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form');
    }
});