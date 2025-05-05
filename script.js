// Data structure for Halliday Physics chapters
const chapters = [
    { id: 1, title: "Measurement", shortTitle: "Measurement" },
    { id: 2, title: "Motion Along a Straight Line", shortTitle: "Linear Motion" },
    { id: 3, title: "Vectors", shortTitle: "Vectors" },
    { id: 4, title: "Motion in Two and Three Dimensions", shortTitle: "3D Motion" },
    { id: 5, title: "Force and Motion I", shortTitle: "Forces I" },
    { id: 6, title: "Force and Motion II", shortTitle: "Forces II" },
    { id: 7, title: "Kinetic Energy and Work", shortTitle: "Work" },
    { id: 8, title: "Potential Energy and Conservation of Energy", shortTitle: "Energy" },
    { id: 9, title: "Center of Mass and Linear Momentum", shortTitle: "Momentum" },
    { id: 10, title: "Rotation", shortTitle: "Rotation" },
    { id: 11, title: "Rolling, Torque, and Angular Momentum", shortTitle: "Torque" },
    { id: 12, title: "Equilibrium and Elasticity", shortTitle: "Equilibrium" },
    { id: 13, title: "Gravitation", shortTitle: "Gravity" },
    { id: 14, title: "Fluids", shortTitle: "Fluids" },
    { id: 15, title: "Oscillations", shortTitle: "Oscillations" },
    { id: 16, title: "Waves I", shortTitle: "Waves I" },
    { id: 17, title: "Waves II", shortTitle: "Waves II" },
    { id: 18, title: "Temperature, Heat, and the First Law of Thermodynamics", shortTitle: "Heat" },
    { id: 19, title: "The Kinetic Theory of Gases", shortTitle: "Gases" },
    { id: 20, title: "Entropy and the Second Law of Thermodynamics", shortTitle: "Entropy" }
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    loadChapters();
    setupEventListeners();
    checkDarkMode();
});

// Load the chapters into the page
function loadChapters() {
    const chaptersContainer = document.getElementById('chapters-container');
    
    // Clear the loading indicator
    chaptersContainer.innerHTML = '';
    
    // Add each chapter
    chapters.forEach(chapter => {
        const chapterCard = document.createElement('div');
        chapterCard.className = 'chapter-card p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all';
        
        // Create chapter content wrapper to allow for flex positioning
        const contentDiv = document.createElement('div');
        contentDiv.className = 'chapter-content';
        
        // Create the title with gradient background
        const titleDiv = document.createElement('div');
        titleDiv.className = 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-2 rounded-md mb-4 mt-1';
        
        const title = document.createElement('h2');
        title.className = 'text-lg font-semibold';
        title.textContent = `${chapter.shortTitle}`;
        titleDiv.appendChild(title);
        
        // Create the description
        const description = document.createElement('p');
        description.className = 'text-gray-600 mb-4';
        description.textContent = `Explore concepts and solve problems related to ${chapter.title.toLowerCase()}.`;
        
        // Append title and description to content div
        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(description);
        
        // Create view questions button wrapper for positioning
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'view-questions-wrapper';
        
        // Create the view questions button
        const button = document.createElement('button');
        button.className = 'view-questions bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors';
        button.textContent = 'View Questions';
        button.setAttribute('data-chapter', chapter.id);
        
        // Append button to wrapper
        buttonWrapper.appendChild(button);
        
        // Append components to the card
        chapterCard.appendChild(contentDiv);
        chapterCard.appendChild(buttonWrapper);
        
        // Append the card to the container
        chaptersContainer.appendChild(chapterCard);
    });
}

// Load questions for a specific chapter
function loadQuestions(chapterId) {
    // Clear the main container
    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = '';
    mainContainer.className = 'container mx-auto px-4 py-8';
    
    // Create a container for the back button and chapter title
    const titleContainer = document.createElement('div');
    titleContainer.className = 'chapter-title-container';
    
    // Create a back button
    const backButton = document.createElement('button');
    backButton.className = 'back-button bg-indigo-600 text-white font-medium py-2 px-4 rounded inline-flex items-center';
    backButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Chapters
    `;
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Create a title
    const chapterTitle = document.createElement('h2');
    chapterTitle.className = 'chapter-title text-2xl font-bold';
    const currentChapter = chapters.find(chapter => chapter.id === parseInt(chapterId));
    chapterTitle.textContent = `${currentChapter.shortTitle}`;
    
    // Add back button and title to container
    titleContainer.appendChild(backButton);
    titleContainer.appendChild(chapterTitle);
    
    // Create a container for the questions
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questions-container grid gap-4 mt-4';
    
    // Add 100 question buttons
    for (let i = 1; i <= 100; i++) {
        const button = document.createElement('button');
        button.className = 'question-button';
        button.setAttribute('data-chapter', chapterId);
        button.setAttribute('data-question', i);
        
        // Create question icon element
        const iconDiv = document.createElement('div');
        iconDiv.className = 'question-icon';
        
        // Add text to the button
        const textSpan = document.createElement('span');
        textSpan.textContent = `Question ${i}`;
        
        // Append icon and text to button
        button.appendChild(iconDiv);
        button.appendChild(textSpan);
        
        // Add click event to each button
        button.addEventListener('click', function() {
            const chapter = this.getAttribute('data-chapter');
            const question = this.getAttribute('data-question');
            showQuestionDetail(chapter, question);
        });
        
        questionsContainer.appendChild(button);
    }
    
    // Append elements to the container
    mainContainer.appendChild(titleContainer);
    mainContainer.appendChild(questionsContainer);
}

// Show details for a specific question
function showQuestionDetail(chapterId, questionId) {
    // Clear the main container
    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = '';
    mainContainer.className = 'container mx-auto px-4 py-8 question-detail-page';
    
    // Create a back button
    const backButton = document.createElement('button');
    backButton.className = 'back-button bg-indigo-600 text-white font-medium py-2 px-4 rounded mb-6 inline-flex items-center';
    backButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Questions
    `;
    backButton.addEventListener('click', () => {
        loadQuestions(chapterId);
    });
    
    // Create the question container
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container p-6 rounded-lg mb-6 max-w-4xl mx-auto';
    
    const questionTitle = document.createElement('h2');
    questionTitle.className = 'text-xl font-bold mb-4';
    const currentChapter = chapters.find(chapter => chapter.id === parseInt(chapterId));
    questionTitle.textContent = `${currentChapter.shortTitle}, Question ${questionId}`;
    
    const questionText = document.createElement('p');
    questionText.className = 'mb-4';
    questionText.textContent = generateQuestionText(parseInt(chapterId), parseInt(questionId));
    
    questionContainer.appendChild(questionTitle);
    questionContainer.appendChild(questionText);
    
    // Create the answer container
    const answerContainer = document.createElement('div');
    answerContainer.className = 'answer-container p-6 rounded-lg mb-8 border-l-4 border-indigo-500 max-w-4xl mx-auto';
    
    const answerTitle = document.createElement('h3');
    answerTitle.className = 'text-lg font-bold mb-3';
    answerTitle.textContent = 'Answer:';
    
    const answerText = document.createElement('p');
    answerText.textContent = generateAnswerText(parseInt(chapterId), parseInt(questionId));
    
    answerContainer.appendChild(answerTitle);
    answerContainer.appendChild(answerText);
    
    // Create navigation buttons
    const navButtons = document.createElement('div');
    navButtons.className = 'flex justify-between max-w-4xl mx-auto';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'dark-button bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded inline-flex items-center';
    prevButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Previous Question
    `;
    
    // Only enable previous button if not on the first question
    if (parseInt(questionId) > 1) {
        prevButton.addEventListener('click', () => {
            showQuestionDetail(chapterId, parseInt(questionId) - 1);
        });
    } else {
        prevButton.disabled = true;
        prevButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
    
    const nextButton = document.createElement('button');
    nextButton.className = 'dark-button bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded inline-flex items-center';
    nextButton.innerHTML = `
        Next Question
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
    `;
    
    // Only enable next button if not on the last question
    if (parseInt(questionId) < 100) {
        nextButton.addEventListener('click', () => {
            showQuestionDetail(chapterId, parseInt(questionId) + 1);
        });
    } else {
        nextButton.disabled = true;
        nextButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
    
    navButtons.appendChild(prevButton);
    navButtons.appendChild(nextButton);
    
    // Append everything to the main container
    mainContainer.appendChild(backButton);
    mainContainer.appendChild(questionContainer);
    mainContainer.appendChild(answerContainer);
    mainContainer.appendChild(navButtons);
}

// Set up event listeners
function setupEventListeners() {
    // Listen for clicks on "View Questions" buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('.view-questions') || e.target.closest('.view-questions')) {
            const button = e.target.matches('.view-questions') ? e.target : e.target.closest('.view-questions');
            const chapterId = button.getAttribute('data-chapter');
            loadQuestions(chapterId);
        }
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    
    // Search when Enter key is pressed on desktop
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value.trim());
            }
        });
    }
    
    // Search when Enter key is pressed on mobile
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value.trim());
            }
        });
    }
    
    // Set up theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Set up back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Check if dark mode is enabled
function checkDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        if (lightIcon && darkIcon) {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    } else {
        if (lightIcon && darkIcon) {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');
    
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        if (lightIcon && darkIcon) {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        if (lightIcon && darkIcon) {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    }
}

// Perform search
function performSearch(query) {
    if (!query) {
        const searchInput = document.getElementById('search-input');
        query = searchInput ? searchInput.value.trim() : '';
        
        // Also check mobile search if desktop search is empty
        if (!query) {
            const mobileSearchInput = document.getElementById('mobile-search-input');
            query = mobileSearchInput ? mobileSearchInput.value.trim() : '';
        }
    }
    
    if (!query) return;
    
    query = query.toLowerCase();
    
    const searchResults = document.getElementById('search-results');
    const resultsContainer = document.getElementById('results-container');
    const chaptersContainer = document.getElementById('chapters-container');
    
    // Clear any existing results
    searchResults.innerHTML = '';
    
    // Show results container and hide chapters
    resultsContainer.classList.remove('hidden');
    chaptersContainer.classList.add('hidden');
    
    // Find matching chapters and questions
    const matchingChapters = findMatchingChapters(query);
    const matchingQuestions = findMatchingQuestions(query);
    
    if (matchingChapters.length === 0 && matchingQuestions.length === 0) {
        // No results found
        const noResults = document.createElement('div');
        noResults.className = 'p-4 bg-white rounded-lg border border-gray-200 shadow-sm';
        noResults.innerHTML = `
            <p class="text-center text-gray-500">No results found for "${query}". Try another search term.</p>
        `;
        searchResults.appendChild(noResults);
    } else {
        // Display matching chapters
        matchingChapters.forEach(chapter => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'p-4 bg-white rounded-lg border border-gray-200 shadow-sm';
            resultDiv.innerHTML = `
                <h3 class="font-bold text-lg mb-2">Chapter ${chapter.id}: ${highlightMatch(chapter.title, query)}</h3>
                <p class="text-gray-600 mb-4">Explore concepts related to ${chapter.title.toLowerCase()}</p>
                <button class="view-questions bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-3 rounded text-sm transition-colors" data-chapter="${chapter.id}">View Questions</button>
            `;
            
            searchResults.appendChild(resultDiv);
            
            // Add event listener for the view questions button
            resultDiv.querySelector('.view-questions').addEventListener('click', function() {
                const chapterId = this.getAttribute('data-chapter');
                loadQuestions(chapterId);
            });
        });
        
        // Display matching questions
        matchingQuestions.forEach(question => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'p-4 bg-white rounded-lg border border-gray-200 shadow-sm';
            
            const chapterInfo = chapters.find(c => c.id === question.chapterId);
            
            resultDiv.innerHTML = `
                <h3 class="font-bold text-lg mb-1">Chapter ${question.chapterId}, Question ${question.questionId}</h3>
                <h4 class="text-md mb-2">${chapterInfo.title}</h4>
                <p class="text-gray-600 mb-4">${highlightMatch(question.questionText, query)}</p>
                <button class="view-question bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-3 rounded text-sm transition-colors" data-chapter="${question.chapterId}" data-question="${question.questionId}">View Solution</button>
            `;
            
            searchResults.appendChild(resultDiv);
            
            // Add event listener for the view question button
            resultDiv.querySelector('.view-question').addEventListener('click', function() {
                const chapter = this.getAttribute('data-chapter');
                const question = this.getAttribute('data-question');
                showQuestionDetail(chapter, question);
            });
        });
    }
}

// Find chapters that match the search query
function findMatchingChapters(query) {
    // Normalize the query to handle more flexible search formats
    query = query.toLowerCase();
    
    return chapters.filter(chapter => {
        // Check for chapter title matches
        if (chapter.title.toLowerCase().includes(query)) {
            return true;
        }
        
        // Check for "chapter X" format
        const chapterMatch = query.match(/chapter\s*(\d+)/i);
        if (chapterMatch && parseInt(chapterMatch[1]) === chapter.id) {
            return true;
        }
        
        return false;
    });
}

// Find questions that match the search query
function findMatchingQuestions(query) {
    const normalizedQuery = query.toLowerCase().trim();
    const results = [];
    
    // First try to match the "chapter X question Y" pattern
    const chapterQuestionRegex = /chapter\s*(\d+)\s*question\s*(\d+)/i;
    const chapterQuestionMatch = normalizedQuery.match(chapterQuestionRegex);
    
    if (chapterQuestionMatch) {
        const chapterId = parseInt(chapterQuestionMatch[1]);
        const questionId = parseInt(chapterQuestionMatch[2]);
        
        if (chapterId >= 1 && chapterId <= 20 && questionId >= 1 && questionId <= 100) {
            const questionText = generateQuestionText(chapterId, questionId);
            
            results.push({
                chapterId: chapterId,
                questionId: questionId,
                questionText: questionText
            });
            
            return results;
        }
    }
    
    // Try to match other patterns
    for (let chapterId = 1; chapterId <= 20; chapterId++) {
        // Look for mentions of this chapter
        if (normalizedQuery.includes(`chapter ${chapterId}`) || 
            normalizedQuery.includes(`chapter${chapterId}`) ||
            normalizedQuery.includes(`ch ${chapterId}`) ||
            normalizedQuery.includes(`ch${chapterId}`)) {
            
            // Look for question numbers in the query
            const questionRegex = /\bq(?:uestion)?\s*(\d+)\b/i;
            const questionMatch = normalizedQuery.match(questionRegex);
            
            if (questionMatch) {
                const questionId = parseInt(questionMatch[1]);
                if (questionId >= 1 && questionId <= 100) {
                    const questionText = generateQuestionText(chapterId, questionId);
                    
                    results.push({
                        chapterId: chapterId,
                        questionId: questionId,
                        questionText: questionText
                    });
                    
                    continue;
                }
            }
            
            // If no specific question was found, return the first 5 questions from this chapter
            for (let i = 1; i <= 5; i++) {
                const questionText = generateQuestionText(chapterId, i);
                
                results.push({
                    chapterId: chapterId,
                    questionId: i,
                    questionText: questionText
                });
            }
        }
    }
    
    // If still no results, look for direct number patterns like "2.5" or "2-5" that might mean chapter 2 question 5
    if (results.length === 0) {
        const chapterQuestionFormat = /(\d+)[.\-](\d+)/;
        const formatMatch = normalizedQuery.match(chapterQuestionFormat);
        
        if (formatMatch) {
            const chapterId = parseInt(formatMatch[1]);
            const questionId = parseInt(formatMatch[2]);
            
            if (chapterId >= 1 && chapterId <= 20 && questionId >= 1 && questionId <= 100) {
                const questionText = generateQuestionText(chapterId, questionId);
                
                results.push({
                    chapterId: chapterId,
                    questionId: questionId,
                    questionText: questionText
                });
                
                return results;
            }
        }
    }
    
    // If no specific chapter/question pattern was matched, search by keywords in all question texts
    if (results.length === 0) {
        for (let chapterId = 1; chapterId <= 20; chapterId++) {
            for (let questionId = 1; questionId <= 5; questionId++) {
                const questionText = generateQuestionText(chapterId, questionId);
                
                if (questionText.toLowerCase().includes(normalizedQuery)) {
                    results.push({
                        chapterId: chapterId,
                        questionId: questionId,
                        questionText: questionText
                    });
                }
            }
        }
    }
    
    return results;
}

// Highlight matched text in search results
function highlightMatch(text, query) {
    if (!query || query === '') return text;
    
    // Escape special characters in the query for use in regex
    const safeQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    const regex = new RegExp(`(${safeQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Generate sample question text based on chapter and question number
function generateQuestionText(chapterId, questionId) {
    const chapter = chapters.find(c => c.id === chapterId);
    
    // Sample questions based on chapter topics
    switch (chapterId) {
        case 1:
            return `A measuring instrument is calibrated to have ${questionId}% uncertainty. If the measured value is 35.7 units, what is the range of possible actual values?`;
        case 2:
            return `A car accelerates from rest at ${questionId} m/s² for 8 seconds. How far does it travel in this time?`;
        case 3:
            return `Two vectors A and B have magnitudes of ${questionId} and ${questionId * 2} units respectively. If they are at right angles, what is the magnitude of their resultant?`;
        case 4:
            return `A projectile is launched at an angle of ${30 + questionId}° with an initial velocity of ${20 + questionId} m/s. Calculate its maximum height.`;
        case 5:
            return `A block of mass ${questionId} kg is subjected to a force of ${questionId * 5} N. What is its acceleration?`;
        default:
            return `This question explores a key concept related to ${chapter.title}. Problem ${questionId} asks you to analyze a scenario involving ${chapter.title.toLowerCase()}.`;
    }
}

// Generate sample answer text
function generateAnswerText(chapterId, questionId) {
    const chapter = chapters.find(c => c.id === chapterId);
    
    // Sample answers based on chapter topics
    switch (chapterId) {
        case 1:
            return `The uncertainty is ${questionId}% of 35.7 units, which equals ${(35.7 * questionId / 100).toFixed(2)} units. Therefore, the range of possible values is from ${(35.7 - 35.7 * questionId / 100).toFixed(2)} to ${(35.7 + 35.7 * questionId / 100).toFixed(2)} units.`;
        case 2:
            return `Using the equation s = (1/2)at², where a = ${questionId} m/s² and t = 8 s, the distance traveled is s = (1/2) × ${questionId} × 8² = ${(0.5 * questionId * 64).toFixed(2)} meters.`;
        case 3:
            return `Using the Pythagorean theorem for perpendicular vectors, the magnitude of the resultant R = √(A² + B²) = √(${questionId}² + ${(questionId * 2)}²) = √(${questionId * questionId} + ${4 * questionId * questionId}) = √(${5 * questionId * questionId}) = ${Math.sqrt(5 * questionId * questionId).toFixed(2)} units.`;
        case 4:
            const angle = 30 + questionId;
            const velocity = 20 + questionId;
            const height = (velocity * velocity * Math.pow(Math.sin(angle * Math.PI / 180), 2)) / (2 * 9.8);
            return `The maximum height can be calculated using h = (v₀² × sin²θ) / (2g), where v₀ = ${velocity} m/s and θ = ${angle}°. Substituting these values: h = (${velocity}² × sin²(${angle}°)) / (2 × 9.8) = ${height.toFixed(2)} meters.`;
        case 5:
            return `Using Newton's Second Law, F = ma, we can calculate the acceleration: a = F/m = ${questionId * 5}/${questionId} = ${5} m/s².`;
        default:
            return `To solve this problem, we need to apply the principles of ${chapter.title.toLowerCase()}. First, we identify the key variables in the scenario. Next, we apply the relevant equations: [appropriate equation for ${chapter.title}]. Solving these equations gives us the answer of [calculated value with appropriate units].`;
    }
} 