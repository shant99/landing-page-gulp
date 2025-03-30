(function () {
	const textEl = document.getElementById("animated-text");
	const text = textEl.textContent.trim();
	textEl.textContent = "";

	function charsToSpan() {
		const chars = text.split("");
		chars.forEach((char) => {
			const span = document.createElement("span");
			span.classList.add("letter");
			span.textContent = char;
			textEl.appendChild(span);
		});
	}
	charsToSpan();

	const letters = document.querySelectorAll(".letter");

	const words = text.split(/\s+/).length;
	const pixelsPerWord = 10;
	const scrollHeight = words * pixelsPerWord;

	const scrollContainer = document.querySelector(".scroll-container");
	scrollContainer.style.height = `calc(100vh + ${scrollHeight}px)`;

	window.addEventListener("scroll", () => {
		const containerTop = scrollContainer.offsetTop;
		const scrollTop = window.scrollY;
		const scrollOffset = scrollTop - containerTop;

		const progress = Math.min(Math.max(scrollOffset / scrollHeight, 0), 1);
		const visibleLetters = Math.floor(progress * letters.length);

		letters.forEach((letter, i) => {
			letter.style.color = i < visibleLetters ? "white" : "gray";
		});
	});
})();
