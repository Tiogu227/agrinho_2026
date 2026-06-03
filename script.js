// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar ícones Lucide
    lucide.createIcons();
    
    // Inicializar componentes
    initNavigation();
    initStatistics();
    initSolutions();
    initQuiz();
    initResources();
    initNewsletter();
    initScrollTop();
});

// ===== NAVEGAÇÃO =====
function initNavigation() {
    const nav = document.getElementById('navigation');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Fechar menu mobile se estiver aberto
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    }
}

// ===== ESTATÍSTICAS ANIMADAS =====
function initStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element) {
    const targetValue = parseInt(element.dataset.value);
    const suffix = element.dataset.suffix;
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            element.textContent = targetValue + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, duration / steps);
}

// ===== SOLUÇÕES =====
const solutionsData = [
    {
        icon: 'droplets',
        title: 'Irrigação Inteligente',
        stats: '50% economia de água',
        description: 'Sistemas de irrigação por gotejamento e sensores que economizam até 50% de água, garantindo eficiência hídrica.',
        image: 'https://images.unsplash.com/photo-1770924712622-111a5a2eaaa4?w=1080',
        color: 'bg-blue'
    },
    {
        icon: 'sun',
        title: 'Energia Renovável',
        stats: '70% redução de custos',
        description: 'Painéis solares e energia eólica reduzem custos e pegada de carbono, promovendo autonomia energética.',
        image: 'https://images.unsplash.com/photo-1670519808965-16b9b2f724af?w=1080',
        color: 'bg-yellow'
    },
    {
        icon: 'recycle',
        title: 'Compostagem Orgânica',
        stats: '100% aproveitamento',
        description: 'Transformação de resíduos em adubo rico, melhorando a qualidade do solo e fechando o ciclo de nutrientes.',
        image: 'https://images.unsplash.com/photo-1619259919902-3f7db9564150?w=1080',
        color: 'bg-green'
    },
    {
        icon: 'trees',
        title: 'Agrofloresta',
        stats: '300% mais biodiversidade',
        description: 'Integração de árvores e culturas aumenta biodiversidade, sequestra carbono e cria ecossistemas resilientes.',
        image: 'https://images.unsplash.com/photo-1765055237527-f92fdd1a2c68?w=1080',
        color: 'bg-emerald'
    },
    {
        icon: 'wheat',
        title: 'Rotação de Culturas',
        stats: '40% aumento produtivo',
        description: 'Alternância de plantios preserva nutrientes do solo, reduz pragas e aumenta produtividade sustentável.',
        image: 'https://images.unsplash.com/photo-1737943052317-4a89d1dcf1f6?w=1080',
        color: 'bg-amber'
    },
    {
        icon: 'heart',
        title: 'Agricultura Orgânica',
        stats: '100% natural',
        description: 'Produção sem agrotóxicos garante alimentos saudáveis e protege polinizadores essenciais.',
        image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1080',
        color: 'bg-pink'
    }
];

let currentSolution = 0;

function initSolutions() {
    renderSolutionsList();
    renderSolutionDetail(0);
}

function renderSolutionsList() {
    const listContainer = document.getElementById('solutions-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = solutionsData.map((solution, index) => `
        <button class="solution-item ${index === 0 ? 'active' : ''}" data-solution="${index}" onclick="selectSolution(${index})">
            <div class="solution-icon ${solution.color}">
                <i data-lucide="${solution.icon}"></i>
            </div>
            <div>
                <h3>${solution.title}</h3>
                <p>${solution.stats}</p>
            </div>
        </button>
    `).join('');
    
    lucide.createIcons();
}

function selectSolution(index) {
    if (index === currentSolution) return;
    
    const detailContainer = document.getElementById('solution-detail');
    detailContainer.style.opacity = '0';
    
    setTimeout(() => {
        currentSolution = index;
        renderSolutionDetail(index);
        
        // Atualizar botões ativos
        document.querySelectorAll('.solution-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        detailContainer.style.opacity = '1';
    }, 300);
}

function renderSolutionDetail(index) {
    const solution = solutionsData[index];
    const detailContainer = document.getElementById('solution-detail');
    if (!detailContainer) return;
    
    detailContainer.innerHTML = `
        <div class="solution-detail-image">
            <img src="${solution.image}" alt="${solution.title}">
            <div class="solution-detail-overlay"></div>
            <div class="solution-detail-header">
                <div class="solution-detail-badge ${solution.color}">
                    <i data-lucide="${solution.icon}"></i>
                    <span>${solution.stats}</span>
                </div>
                <h3 class="solution-detail-title">${solution.title}</h3>
            </div>
        </div>
        <div class="solution-detail-content">
            <p class="solution-detail-description">${solution.description}</p>
            <div class="solution-benefits">
                <div class="benefit-card green-bg">
                    <div class="benefit-title">Impacto Positivo</div>
                    <p class="benefit-description">Redução significativa no impacto ambiental</p>
                </div>
                <div class="benefit-card blue-bg">
                    <div class="benefit-title">Econômico</div>
                    <p class="benefit-description">Economia a longo prazo para produtores</p>
                </div>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

// ===== QUIZ =====
const quizQuestions = [
    {
        question: 'Qual a porcentagem de água que pode ser economizada com irrigação por gotejamento?',
        options: ['20%', '50%', '70%', '90%'],
        correctAnswer: 1,
        explanation: 'A irrigação por gotejamento pode economizar até 50% de água comparado aos métodos tradicionais!'
    },
    {
        question: 'O que é agrofloresta?',
        options: [
            'Plantio apenas de árvores',
            'Integração de árvores com culturas agrícolas',
            'Floresta sem intervenção humana',
            'Técnica de irrigação'
        ],
        correctAnswer: 1,
        explanation: 'Agrofloresta combina árvores e culturas, aumentando biodiversidade e criando ecossistemas resilientes!'
    },
    {
        question: 'Qual benefício da compostagem orgânica?',
        options: [
            'Reduz custos com fertilizantes químicos',
            'Melhora a estrutura do solo',
            'Fecha o ciclo de nutrientes',
            'Todas as alternativas'
        ],
        correctAnswer: 3,
        explanation: 'A compostagem traz todos esses benefícios, transformando resíduos em recursos valiosos!'
    },
    {
        question: 'Por que a rotação de culturas é importante?',
        options: [
            'Para variar a alimentação',
            'Para preservar nutrientes do solo',
            'Para decorar a fazenda',
            'Não é importante'
        ],
        correctAnswer: 1,
        explanation: 'A rotação de culturas preserva os nutrientes do solo e reduz pragas naturalmente!'
    }
];

let currentQuestionIndex = 0;
let selectedAnswer = null;
let quizScore = 0;
let answeredQuestions = [];

function initQuiz() {
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const quizCard = document.getElementById('quiz-card');
    if (!quizCard) return;
    
    const question = quizQuestions[currentQuestionIndex];
    const progress = (answeredQuestions.length / quizQuestions.length) * 100;
    
    quizCard.innerHTML = `
        <div class="quiz-progress">
            <div class="quiz-progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="quiz-content">
            <div class="quiz-question-number">
                Questão ${currentQuestionIndex + 1} de ${quizQuestions.length}
            </div>
            <h3 class="quiz-question">${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" onclick="selectQuizAnswer(${index})" id="option-${index}">
                        <span>${option}</span>
                    </button>
                `).join('')}
            </div>
            <div id="quiz-explanation" class="quiz-explanation hidden"></div>
            <button id="quiz-next-btn" class="quiz-next-btn hidden" onclick="nextQuestion()">
                ${currentQuestionIndex < quizQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
            </button>
        </div>
    `;
}

function selectQuizAnswer(answerIndex) {
    if (selectedAnswer !== null) return;
    
    selectedAnswer = answerIndex;
    const question = quizQuestions[currentQuestionIndex];
    const correctIndex = question.correctAnswer;
    
    // Atualizar score
    if (answerIndex === correctIndex) {
        quizScore++;
    }
    
    answeredQuestions.push(currentQuestionIndex);
    document.getElementById('quiz-score').textContent = quizScore;
    
    // Mostrar feedback visual
    document.querySelectorAll('.quiz-option').forEach((option, index) => {
        option.disabled = true;
        if (index === correctIndex) {
            option.classList.add('correct');
            option.innerHTML += '<i data-lucide="check-circle" style="width: 24px; height: 24px; color: #16a34a;"></i>';
        } else if (index === answerIndex) {
            option.classList.add('incorrect');
            option.innerHTML += '<i data-lucide="x-circle" style="width: 24px; height: 24px; color: #ef4444;"></i>';
        }
    });
    
    // Mostrar explicação
    const explanationDiv = document.getElementById('quiz-explanation');
    explanationDiv.className = `quiz-explanation ${answerIndex === correctIndex ? 'correct-bg' : 'info-bg'}`;
    explanationDiv.innerHTML = `<p class="quiz-explanation-text">${question.explanation}</p>`;
    explanationDiv.classList.remove('hidden');
    
    // Mostrar botão próximo
    document.getElementById('quiz-next-btn').classList.remove('hidden');
    
    lucide.createIcons();
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        selectedAnswer = null;
        renderQuizQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const quizCard = document.getElementById('quiz-card');
    const emoji = quizScore === quizQuestions.length ? '🎉' : quizScore >= quizQuestions.length / 2 ? '👏' : '📚';
    const message = quizScore === quizQuestions.length 
        ? 'Parabéns! Você é um expert em agricultura sustentável!' 
        : quizScore >= quizQuestions.length / 2 
        ? 'Muito bem! Você conhece bastante sobre sustentabilidade no agro!' 
        : 'Continue aprendendo sobre práticas sustentáveis!';
    
    quizCard.innerHTML = `
        <div class="quiz-result">
            <div class="quiz-result-emoji">${emoji}</div>
            <h2 class="quiz-result-title">Quiz Finalizado!</h2>
            <div class="quiz-result-score">${quizScore}/${quizQuestions.length}</div>
            <p class="quiz-result-message">${message}</p>
            <button class="quiz-restart-btn" onclick="restartQuiz()">
                <i data-lucide="refresh-cw"></i>
                Tentar Novamente
            </button>
        </div>
    `;
    
    lucide.createIcons();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    selectedAnswer = null;
    quizScore = 0;
    answeredQuestions = [];
    document.getElementById('quiz-score').textContent = '0';
    renderQuizQuestion();
}

// ===== RECURSOS =====
const resourcesData = [
    {
        icon: 'book-open',
        title: 'Guia Completo de Agricultura Sustentável',
        description: 'Manual ilustrado com práticas sustentáveis para pequenos e médios produtores.',
        type: 'PDF',
        color: 'bg-blue'
    },
    {
        icon: 'video',
        title: 'Série de Vídeos: Do Campo ao Futuro',
        description: 'Documentários sobre histórias de sucesso em sustentabilidade agrícola.',
        type: 'Vídeo',
        color: 'bg-red'
    },
    {
        icon: 'file-text',
        title: 'Artigos Científicos e Pesquisas',
        description: 'Estudos atualizados sobre inovações e resultados em agricultura sustentável.',
        type: 'Artigo',
        color: 'bg-green'
    },
    {
        icon: 'book-open',
        title: 'Cartilha Agrishow',
        description: 'Material educativo desenvolvido para estudantes e educadores.',
        type: 'PDF',
        color: 'bg-purple'
    },
    {
        icon: 'video',
        title: 'Tutoriais de Compostagem',
        description: 'Passo a passo em vídeo para criar seu sistema de compostagem.',
        type: 'Vídeo',
        color: 'bg-orange'
    },
    {
        icon: 'file-text',
        title: 'Infográficos Interativos',
        description: 'Dados visuais sobre impacto ambiental e benefícios sustentáveis.',
        type: 'Infográfico',
        color: 'bg-teal'
    }
];

function initResources() {
    const gridContainer = document.getElementById('resources-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = resourcesData.map(resource => `
        <div class="resource-card">
            <div class="resource-icon ${resource.color}">
                <i data-lucide="${resource.icon}"></i>
            </div>
            <span class="resource-tag">${resource.type}</span>
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <div class="resource-actions">
                <button class="btn-download" onclick="handleDownload('${resource.title}')">
                    <i data-lucide="download"></i>
                    Baixar
                </button>
                <button class="btn-external" onclick="showToast('Abrindo recurso...')">
                    <i data-lucide="external-link"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function handleDownload(title) {
    showToast('Download iniciado: ' + title, 'success');
}

// ===== NEWSLETTER =====
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const submitBtn = document.getElementById('newsletter-btn');
        const email = emailInput.value.trim();
        
        if (!email) {
            showToast('Por favor, insira seu e-mail!', 'error');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('Por favor, insira um e-mail válido!', 'error');
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        setTimeout(() => {
            showToast('Inscrição realizada com sucesso! 🎉', 'success');
            emailInput.value = '';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Inscrever-se';
        }, 1500);
    });
}

// ===== SCROLL TO TOP =====
function initScrollTop() {
    const scrollBtn = document.getElementById('scroll-top-btn');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.remove('hidden');
        } else {
            scrollBtn.classList.add('hidden');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
