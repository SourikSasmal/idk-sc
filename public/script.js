let lastQuoteIndex = -1;

document.getElementById('new-quote').addEventListener('click', () => {
  const quoteElement = document.getElementById('quote');
  const authorElement = document.getElementById('author');
  const spinner = document.getElementById('spinner');

  // Show spinner and clear previous quote
  spinner.style.display = 'block';
  quoteElement.textContent = '';
  authorElement.textContent = '';

  fetch('/quote')
    .then(response => response.json())
    .then(data => {
      let newQuoteIndex;
      do {
        newQuoteIndex = Math.floor(Math.random() * data.length);
      } while (newQuoteIndex === lastQuoteIndex);

      lastQuoteIndex = newQuoteIndex;

      quoteElement.textContent = data[newQuoteIndex].quote;
      authorElement.textContent = data[newQuoteIndex].author;
      spinner.style.display = 'none'; // Hide spinner
    })
    .catch(error => {
      console.error('Error fetching quote:', error);
      spinner.style.display = 'none'; // Hide spinner
    });
});

const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  themeToggleButton.textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
});

// Set initial button text based on the current theme
themeToggleButton.textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
