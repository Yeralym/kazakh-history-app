// Подключение к облачной базе Supabase
const SUPABASE_URL = 'https://xipujmuvqcqhjbxhbbem.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_gQuaGIyX7W7-L6pdAjUQIQ_icNvs...'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let leaderboardData = [];

// Автоматическая загрузка таблицы лидеров из облака при старте
async function loadLeaderboardFromCloud() {
    const { data, error } = await _supabase
        .from('leaderboard')
        .select('*')
        .order('percent', { ascending: false });
    
    if (!error && data) {
        leaderboardData = data;
        renderLeaderboard();
    } else {
        console.error('Ошибка загрузки из облака:', error);
    }
}
loadLeaderboardFromCloud();

const quizData = [
    { q: "1. What is the main subject of the History of Kazakhstan course?", options: ["A) The history of Europe", "B) The history of Ancient Egypt", "C) The history of Kazakhstan and its people", "D) The history of modern technology"], answer: "C" },
    { q: "2. What is periodization?", options: ["A) The division of history into periods", "B) The study of ancient weapons", "C) The study of geography", "D) The writing of biographies"], answer: "A" },
    { q: "3. Why is studying history important?", options: ["A) It teaches only foreign languages", "B) It focuses only on technology", "C) It replaces geography", "D) It helps understand the country's past and cultural heritage"], answer: "D" },
    { q: "4. Which period came first in human history?", options: ["A) Stone Age", "B) Bronze Age", "C) Iron Age", "D) Middle Ages"], answer: "A" },
    { q: "5. What does Paleolithic mean?", options: ["A) New Stone Age", "B) Old Stone Age", "C) Copper Age", "D) Iron Age"], answer: "B" },
    { q: "6. What was a major activity of Paleolithic people?", options: ["A) Industrial production", "B) Modern agriculture", "C) Hunting and gathering", "D) Factory work"], answer: "C" },
    { q: "7. What is the Mesolithic?", options: ["A) New Stone Age", "B) Bronze Age", "C) Middle Stone Age", "D) Medieval period"], answer: "C" },
    { q: "8. Which development is associated with the Neolithic Revolution?", options: ["A) The invention of computers", "B) The creation of modern states", "C) The invention of printing", "D) The beginning of farming and animal domestication"], answer: "D" },
    { q: "9. What is the Eneolithic?", options: ["A) Copper-Stone Age", "B) Early Iron Age", "C) Middle Ages", "D) Late Bronze Age"], answer: "A" },
    { q: "10. Which material became important during the Eneolithic?", options: ["A) Steel", "B) Copper", "C) Plastic", "D) Aluminum"], answer: "B" },
    { q: "11. Which culture is famous for early horse domestication in Kazakhstan?", options: ["A) Saka culture", "B) Kipchak culture", "C) Botai culture", "D) Karakhanid culture"], answer: "C" },
    { q: "12. Botai culture belongs mainly to which period?", options: ["A) Medieval period", "B) Iron Age", "C) Modern period", "D) Eneolithic"], answer: "D" },
    { q: "13. What animal is especially associated with Botai culture?", options: ["A) Horse", "B) Elephant", "C) Camel", "D) Tiger"], answer: "A" },
    { q: "14. What was an important result of agriculture?", options: ["A) Humans stopped using tools", "B) People stopped domesticating animals", "C) Permanent settlements could develop", "D) Trade disappeared"], answer: "C" },
    { q: "15. Why was horse domestication important?", options: ["A) It ended all farming", "B) It changed transport, economy, and human mobility", "C) It prevented trade", "D) It created modern cities immediately"], answer: "B" },
    { q: "16. What was a major activity of Bronze Age communities?", options: ["A) Computer programming", "B) Industrial manufacturing", "C) Modern banking", "D) Farming, livestock breeding, and metalworking"], answer: "D" },
    { q: "17. Which culture is associated with the Bronze Age in Kazakhstan?", options: ["A) Andronovo culture", "B) Botai culture", "C) Golden Horde culture", "D) Karakhanid culture"], answer: "A" },
    { q: "18. Begazy-Dandybai culture belongs mainly to which period?", options: ["A) Paleolithic", "B) Mesolithic", "C) Bronze Age", "D) Modern Age"], answer: "C" },
    { q: "19. What is a kurgan?", options: ["A) A type of boat", "B) A burial mound", "C) A farming tool", "D) A palace"], answer: "B" },
    { q: "20. What contributed to the rise of nomadic civilization?", options: ["A) The development of livestock breeding and mobility", "B) The invention of the internet", "C) The disappearance of animals", "D) The development of large factories"], answer: "A" },
    { q: "21. The Saka tribes mainly lived during which period?", options: ["A) Paleolithic", "B) Middle Ages", "C) Modern period", "D) Early Iron Age"], answer: "D" },
    { q: "22. What was an important part of the Saka economy?", options: ["A) Computer science", "B) Factory production", "C) Nomadic and semi-nomadic livestock breeding", "D) Modern banking"], answer: "C" },
    { q: "23. What was a common form of Saka political organization?", options: ["A) Modern democratic republics", "B) Tribal unions and chiefdoms", "C) Industrial corporations", "D) City-states like Ancient Greece only"], answer: "B" },
    { q: "24. What is the famous artistic style of the Saka?", options: ["A) Animal style", "B) Gothic style", "C) Baroque style", "D) Impressionism"], answer: "A" },
    { q: "25. Which animals often appeared in Saka animal-style art?", options: ["A) Dinosaurs only", "B) Modern cars", "C) Robots", "D) Deer, horses, and predators"], answer: "D" },
    { q: "26. Which famous archaeological discovery is associated with the Saka?", options: ["A) The Terracotta Army", "B) The Rosetta Stone", "C) The Golden Man", "D) The Colosseum"], answer: "C" },
    { q: "27. What does the Golden Man demonstrate?", options: ["A) The wealth and artistic skill of Saka society", "B) The invention of printing", "C) The existence of modern industry", "D) The beginning of the Renaissance"], answer: "A" },
    { q: "28. Why is the Early Iron Age important in Kazakhstan?", options: ["A) It ended the use of horses", "B) It helped develop nomadic civilization in the steppe", "C) It introduced modern computers", "D) It eliminated cultural exchange"], answer: "B" },
    { q: "29. The Hun Empire was mainly associated with which region?", options: ["A) South America", "B) Australia", "C) Central Asia and the Eurasian steppe", "D) Western Africa"], answer: "C" },
    { q: "30. Which leader is traditionally associated with the European Huns?", options: ["A) Alexander the Great", "B) Julius Caesar", "C) Genghis Khan", "D) Attila"], answer: "D" },
    { q: "31. What was an important feature of Hun military power?", options: ["A) Highly mobile cavalry", "B) Large modern ships", "C) Tanks", "D) Aircraft"], answer: "A" },
    { q: "32. The Usuns were mainly located in which region?", options: ["A) Scandinavia", "B) Semirechye and the area around Lake Issyk-Kul", "C) South America", "D) Western Europe"], answer: "B" },
    { q: "33. What was an important economic activity of the Usuns?", options: ["A) Modern industry", "B) Computer manufacturing", "C) Livestock breeding and agriculture", "D) Ocean fishing only"], answer: "C" },
    { q: "34. The Kangly state was located mainly in:", options: ["A) The Syr Darya region and Central Asia", "B) Northern Europe", "C) Japan", "D) North America"], answer: "A" },
    { q: "35. What was important in Kangly economic life?", options: ["A) Industrial robotics", "B) Agriculture, livestock breeding, and trade", "C) Modern banking", "D) Space exploration"], answer: "B" },
    { q: "36. The Sarmatians were known as:", options: ["A) Medieval European kings", "B) Ancient Egyptian pharaohs", "C) Modern scientists", "D) Iranian-speaking steppe peoples"], answer: "D" },
    { q: "37. Why were the Usuns, Kangly, and Sarmatians important?", options: ["A) They influenced regional politics, culture, and population history", "B) They invented modern computers", "C) They founded the Roman Empire", "D) They ended all trade"], answer: "A" },
    { q: "38. Which activity connected many ancient steppe peoples?", options: ["A) Internet communication", "B) Industrial production", "C) Trade and cultural exchange", "D) Air travel"], answer: "C" },
    { q: "39. When was the Great Turkic Khaganate established?", options: ["A) 751 CE", "B) 1219 CE", "C) 1465 CE", "D) 552 CE"], answer: "D" },
    { q: "40. Who is traditionally recognized as the founder of the Great Turkic Khaganate?", options: ["A) Attila", "B) Bumin Qaghan", "C) Timur", "D) Ablai Khan"], answer: "B" },
    { q: "41. The Great Turkic Khaganate was established in:", options: ["A) South America", "B) Western Africa", "C) Central Asia", "D) Australia"], answer: "C" },
    { q: "42. What was the main political title of the Turkic ruler?", options: ["A) Khagan", "B) Pharaoh", "C) Consul", "D) Emperor of Rome"], answer: "A" },
    { q: "43. What helped the Great Turkic Khaganate rise?", options: ["A) Modern factories", "B) Ocean colonization", "C) Industrial revolution", "D) Military power, tribal alliances, and control of trade routes"], answer: "D" },
    { q: "44. Which neighboring powers had relations with the Turkic Khaganate?", options: ["A) Brazil, Canada, and Mexico", "B) China, Iran, and Byzantium", "C) Australia, Japan, and Spain", "D) Egypt, Greece, and Rome only"], answer: "B" },
    { q: "45. What was one important goal of Turkic diplomacy?", options: ["A) Control of trade and political influence", "B) Ending all international relations", "C) Destroying agriculture", "D) Stopping cultural exchange"], answer: "A" },
    { q: "46. What was the Great Turkic Khaganate divided into?", options: ["A) Northern and Southern Roman Empires", "B) Three European kingdoms", "C) Eastern and Western Turkic Khaganates", "D) Four Chinese dynasties"], answer: "C" },
    { q: "47. Why was the Turkic Khaganate historically important?", options: ["A) It invented electricity", "B) It created modern democracy", "C) It ended nomadic life", "D) It united large territories of the Eurasian steppe"], answer: "D" },
    { q: "48. What does “On-Ok” mean?", options: ["A) Ten cities", "B) Ten arrows", "C) Ten kings", "D) Ten mountains"], answer: "B" },
    { q: "49. The Western Turkic Khaganate was especially associated with:", options: ["A) Semirechye and Central Asia", "B) South America", "C) Northern Africa", "D) Western Europe"], answer: "A" },
    { q: "50. What was the On-Ok system?", options: ["A) A Chinese writing system", "B) A type of ancient weapon", "C) A political and tribal organization of ten tribes", "D) A religious festival"], answer: "C" },
    { q: "51. Which city was an important center of the Western Turkic Khaganate?", options: ["A) London", "B) Suyab", "C) Rome", "D) Athens"], answer: "B" },
    { q: "52. The Türgesh Khaganate emerged in:", options: ["A) South America", "B) Scandinavia", "C) Australia", "D) Central Asia"], answer: "D" },
    { q: "53. What was the Battle of Talas?", options: ["A) A major battle in 751 CE", "B) A battle in 1465 CE", "C) A battle in Ancient Egypt", "D) A battle during World War II"], answer: "A" },
    { q: "54. The Battle of Talas took place in:", options: ["A) 552 CE", "B) 1219 CE", "C) 751 CE", "D) 1723 CE"], answer: "C" },
    { q: "55. Which two major powers fought at the Battle of Talas?", options: ["A) Rome and Greece", "B) Abbasid forces and Tang China", "C) Britain and France", "D) Russia and Japan"], answer: "B" },
    { q: "56. What was one important consequence of the Battle of Talas?", options: ["A) It created the Roman Empire", "B) It ended all trade", "C) It founded the Mongol Empire", "D) It strengthened the influence of Islam in Central Asia"], answer: "D" },
    { q: "57. The Karakhanid dynasty ruled mainly in:", options: ["A) Central Asia", "B) North America", "C) Western Europe", "D) Australia"], answer: "A" },
    { q: "58. What religion became dominant among the Karakhanids?", options: ["A) Buddhism", "B) Christianity", "C) Islam", "D) Shinto"], answer: "C" },
    { q: "59. Why was the Karakhanid period important?", options: ["A) Cities completely disappeared", "B) Islamization and urban development increased", "C) Trade ended", "D) Farming stopped"], answer: "B" },
    { q: "60. Which city was an important center of the Karakhanids?", options: ["A) London", "B) Paris", "C) Rome", "D) Balasagun"], answer: "D" },
    { q: "61. What type of economy developed in Karakhanid cities?", options: ["A) Trade, crafts, and agriculture", "B) Modern industrial production", "C) Space technology", "D) Ocean shipping only"], answer: "A" },
    { q: "62. The Kipchaks were mainly associated with:", options: ["A) South America", "B) Southern Africa", "C) The Eurasian steppe", "D) Australia"], answer: "C" },
    { q: "63. What was the steppe region associated with the Kipchaks often called?", options: ["A) Mesopotamia", "B) Desht-i Kipchak", "C) Anatolia", "D) Scandinavia"], answer: "B" },
    { q: "64. What was an important role of the Kipchaks?", options: ["A) They invented computers", "B) They founded Ancient Egypt", "C) They ended the Silk Road", "D) They influenced Eurasian politics and military affairs"], answer: "D" },
    { q: "65. What was the Great Silk Road?", options: ["A) A network of trade routes connecting East and West", "B) A single modern highway", "C) A military fort", "D) A river"], answer: "A" },
    { q: "66. Which goods were traded along the Silk Road?", options: ["A) Only modern cars", "B) Only weapons", "C) Silk, spices, metals, and textiles", "D) Only books"], answer: "C" },
    { q: "67. What was the main economic importance of the Silk Road?", options: ["A) It stopped international trade", "B) It promoted trade and the growth of cities", "C) It eliminated agriculture", "D) It prevented migration"], answer: "B" },
    { q: "68. Which region of Kazakhstan was important for Silk Road trade?", options: ["A) Only the Arctic", "B) Only Western Europe", "C) Only South America", "D) Southern Kazakhstan"], answer: "D" },
    { q: "69. Which city was an important Silk Road center in Kazakhstan?", options: ["A) Taraz", "B) London", "C) New York", "D) Tokyo"], answer: "A" },
    { q: "70. What else spread along the Silk Road?", options: ["A) Only gold", "B) Only armies", "C) Religions, ideas, technologies, and cultures", "D) Only farming tools"], answer: "C" },
    { q: "71. How did the Silk Road influence urbanization?", options: ["A) It destroyed every city", "B) It helped cities grow as trade and craft centers", "C) It prevented settlement", "D) It stopped cultural development"], answer: "B" },
    { q: "72. What is the Muslim Renaissance?", options: ["A) The beginning of the Stone Age", "B) The end of all education", "C) A military campaign", "D) A period of major scientific, cultural, and intellectual development in the Islamic world"], answer: "D" },
    { q: "73. Which region played an important role in the Muslim Renaissance?", options: ["A) Central Asia", "B) Australia", "C) South America", "D) Antarctica"], answer: "A" },
    { q: "74. Who was Al-Farabi?", options: ["A) A Roman emperor", "B) A military commander of the Huns", "C) A philosopher and scientist", "D) A modern politician"], answer: "C" },
    { q: "75. Al-Farabi is often known as:", options: ["A) The First Pharaoh", "B) The Second Teacher", "C) The Golden King", "D) The Father of Modern Industry"], answer: "B" },
    { q: "76. Who wrote the famous work The Book of Healing?", options: ["A) Al-Farabi", "B) Attila", "C) Bumin Qaghan", "D) Ibn Sina (Avicenna)"], answer: "D" },
    { q: "77. Ibn Sina was famous for contributions to:", options: ["A) Medicine and philosophy", "B) Modern aviation", "C) Computer programming", "D) Ocean exploration"], answer: "A" },
    { q: "78. Which scholar wrote The Compendious Book on Calculation by Completion and Balancing?", options: ["A) Ibn Sina", "B) Al-Farabi", "C) Al-Khwarizmi", "D) Mahmud Kashgari"], answer: "C" },
    { q: "79. Why is the Muslim Renaissance important in the history of Central Asia?", options: ["A) It ended all scientific progress", "B) It contributed to science, philosophy, medicine, mathematics, and culture", "C) It destroyed education", "D) It stopped cultural exchange"], answer: "B" },
    { q: "80. Which field was strongly developed during the Muslim Renaissance?", options: ["A) Only modern aviation", "B) Only industrial robotics", "C) Only computer games", "D) Mathematics"], answer: "D" },
    { q: "81. Which scholar is associated with the study of Turkic languages?", options: ["A) Mahmud Kashgari", "B) Julius Caesar", "C) Attila", "D) Bumin Qaghan"], answer: "A" },
    { q: "82. What is Dīwān Lughāt al-Turk?", options: ["A) A military treaty", "B) A Roman history book", "C) A dictionary of Turkic languages", "D) A book about modern economics"], answer: "C" },
    { q: "83. Which scholar wrote Kutadgu Bilig?", options: ["A) Al-Khwarizmi", "B) Yusuf Balasaguni", "C) Ibn Sina", "D) Attila"], answer: "B" },
    { q: "84. What is Kutadgu Bilig mainly about?", options: ["A) Ancient weapons", "B) Modern technology", "C) Ocean exploration", "D) Wisdom, ethics, and governance"], answer: "D" },
    { q: "85. Which subject was important to Al-Farabi?", options: ["A) Philosophy", "B) Modern aviation", "C) Computer programming", "D) Industrial engineering"], answer: "A" },
    { q: "86. What did scholars of the Muslim Renaissance contribute to?", options: ["A) Only military affairs", "B) Only agriculture", "C) Science, medicine, mathematics, and philosophy", "D) Only architecture"], answer: "C" },
    { q: "87. Which city was an important intellectual center of Central Asia?", options: ["A) London", "B) Baghdad", "C) New York", "D) Sydney"], answer: "B" },
    { q: "88. What helped the development of science during the Muslim Renaissance?", options: ["A) The destruction of libraries", "B) The end of education", "C) The stopping of trade", "D) Translation and the exchange of knowledge"], answer: "D" },
    { q: "89. Which subject did Ibn Sina study and develop?", options: ["A) Medicine", "B) Modern programming", "C) Rocket science", "D) Industrial design"], answer: "A" },
    { q: "90. What is one important legacy of the Muslim Renaissance?", options: ["A) The disappearance of science", "B) The end of cultural exchange", "C) The preservation and development of knowledge", "D) The decline of education"], answer: "C" }
];

const topics = [
    "Introduction to the course 'History of Kazakhstan': goals, objectives, and significance.",
    "Periodization of the history of Kazakhstan.",
    "Stone Age in Kazakhstan: Paleolithic, Mesolithic, Neolithic, Eneolithic.",
    "Neolithic Revolution and its global and local importance.",
    "Botai culture and the domestication of the horse.",
    "Bronze Age in Kazakhstan: Andronovo and Begazy-Dandybaj cultures.",
    "Origins of nomadic civilization in the steppe.",
    "The socio-political history of the Saka tribes: territory, economy, and governance.",
    "The culture of the Saks: animal style art, burial traditions, and spiritual beliefs.",
    "The political history of the Hun Empire in Central Asia.",
    "The socio-political history of the Usuns, Kangly, and Sarmatians: role in regional dynamics and ethnogenesis.",
    "The Early Iron Age as the foundation of the nomadic civilization in Kazakhstan.",
    "Establishment of the Great Turkic Khaganate: origins, rise, and consolidation of power.",
    "External relations of the Turkic Khaganates: Byzantium, Iran, and China.",
    "Western Turkic Khaganate (On-Ok, 'Ten Arrows')",
    "Turgesh Khaganate and the Battle of Talas (751)",
    "Karakhanid dynasty (Islamization, urban development)",
    "Kipchak Khanate (Dasht-i Kipchak, role in Eurasian politics)",
    "The Great Silk Road: its role in economy, urbanization, and cultural exchange.",
    "The Muslim Renaissance in Central Asia."
];

let currentUser = null;
let questionsRendered = false;
let timerInterval = null;
let elapsedSeconds = 0;

function switchTab(tab) {
    document.getElementById('hub-view').style.display = (tab === 'hub') ? 'block' : 'none';
    document.getElementById('quiz-view').style.display = (tab === 'quiz') ? 'block' : 'none';
    document.getElementById('essay-view').style.display = (tab === 'essay') ? 'block' : 'none';
    window.scrollTo(0, 0);

    if (tab === 'quiz' && !currentUser) {
        document.getElementById('quiz-auth-card').style.display = 'flex';
        document.getElementById('quiz-questions-card').style.display = 'none';
        document.getElementById('quiz-result-card').style.display = 'none';
    }

    if (tab === 'essay') {
        pickRandomEssayTopic();
    }
}

function handleAuth() {
    const name = document.getElementById('student-name').value.trim();
    const email = document.getElementById('student-email').value.trim();
    const errorDiv = document.getElementById('auth-error');

    if (!name || !email) {
        errorDiv.style.display = 'block';
        return;
    }
    errorDiv.style.display = 'none';

    currentUser = { name, email };
    document.getElementById('student-greeting').innerText = `Student: ${name} (${email})`;
    
    document.getElementById('quiz-auth-card').style.display = 'none';
    document.getElementById('quiz-questions-card').style.display = 'block';

    if (!questionsRendered) {
        renderQuizQuestions();
        questionsRendered = true;
    }

    startTimer();
}

function startTimer() {
    elapsedSeconds = 0;
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        const mins = Math.floor(elapsedSeconds / 60);
        const secs = elapsedSeconds % 60;
        document.getElementById('live-timer').innerText = `⏱️ ${mins}m ${secs < 10 ? '0' : ''}${secs}sec`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}sec`;
}

function renderQuizQuestions() {
    const container = document.getElementById('questions-container');
    let html = '';
    quizData.forEach((item, index) => {
        html += `<div class="question-card"><div class="question-title">${item.q}</div>`;
        item.options.forEach((opt) => {
            const optLetter = opt.charAt(0);
            html += `<label class="option-label"><input type="radio" name="q${index}" value="${optLetter}">${opt}</label>`;
        });
        html += `</div>`;
    });
    container.innerHTML = html;
}

async function submitQuiz() {
    let score = 0;
    quizData.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === item.answer) {
            score++;
        }
    });

    const percentage = Math.round((score / quizData.length) * 100);
    const timeFormatted = stopTimer();

    const newResult = {
        name: currentUser.name,
        score: score,
        total: quizData.length,
        percent: percentage,
        time: timeFormatted
    };

    // Отправка результата в облачную базу данных Supabase
    const { error } = await _supabase.from('leaderboard').insert([newResult]);
    if (error) {
        console.error('Ошибка сохранения в облако:', error.message);
    }

    // Подгружаем актуальную таблицу из базы данных
    await loadLeaderboardFromCloud();

    document.getElementById('quiz-questions-card').style.display = 'none';
    document.getElementById('quiz-result-card').style.display = 'block';

    document.getElementById('personal-result-summary').innerHTML = `
        🎉 <b>Congratulations, ${currentUser.name}!</b><br>
        Score: <b>${score}/${quizData.length} (${percentage}%)</b> in time <b>${timeFormatted}</b>.
    `;

    if (percentage >= 65) {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
        });
    }
}

function renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    let html = '';
    leaderboardData.forEach(row => {
        const isCurrent = currentUser && row.name === currentUser.name;
        html += `
            <tr style="${isCurrent ? 'background: #f0f9eb; font-weight: bold;' : ''}">
                <td>${row.name} ${isCurrent ? '⭐ (You)' : ''}</td>
                <td>${row.score}/${row.total}</td>
                <td>${row.percent}%</td>
                <td>${row.time}</td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function resetQuiz() {
    currentUser = null;
    questionsRendered = false;
    document.getElementById('student-name').value = '';
    document.getElementById('student-email').value = '';
    document.getElementById('quiz-result-card').style.display = 'none';
    document.getElementById('quiz-auth-card').style.display = 'flex';
}

function generateTopic() {
    const randomIndex = Math.floor(Math.random() * topics.length);
    document.getElementById("topic-display").innerText = topics[randomIndex];
}

function pickRandomEssayTopic() {
    const randomIndex = Math.floor(Math.random() * topics.length);
    document.getElementById("current-essay-topic").innerText = topics[randomIndex];
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.name.endsWith('.docx')) {
        reader.onload = function(e) {
            mammoth.extractRawText({ arrayBuffer: e.target.result })
                .then(result => {
                    document.getElementById("student-essay-text").value = result.value;
                    alert("✅ .docx file successfully read!");
                })
                .catch(err => alert("❌ Error reading .docx file"));
        };
        reader.readAsArrayBuffer(file);
    } else if (file.name.endsWith('.pdf')) {
        reader.onload = async function(e) {
            try {
                const typedarray = new Uint8Array(e.target.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let extractedText = "";
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    extractedText += textContent.items.map(item => item.str).join(" ") + "\n";
                }
                document.getElementById("student-essay-text").value = extractedText;
                alert("✅ .pdf file successfully read!");
            } catch (err) {
                alert("❌ Error reading .pdf file");
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Please upload a .docx or .pdf file.");
    }
}

async function callGroqAI() {
    const topic = document.getElementById("current-essay-topic").innerText;
    const text = document.getElementById("student-essay-text").value.trim();
    const responseBox = document.getElementById("ai-response-container");
    const feedbackText = document.getElementById("ai-feedback-text");
    
    const apiKey = "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";

    if (!topic || topic.includes("Randomizer is picking")) {
        alert("Please pick a topic using the randomizer first!");
        return;
    }
    if (!text || text.length < 5) {
        alert("Essay text is too short or empty.");
        return;
    }

    responseBox.style.display = 'block';
    feedbackText.innerHTML = "⏳ AI (Groq Llama 3.3) is analyzing your essay...";

    try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: "You are a strict and objective professor of the History of Kazakhstan." 
                    },
                    { 
                        role: "user", 
                        content: `Evaluate the student's essay on the topic: "${topic}".\n\nEssay text:\n${text}\n\nProvide a detailed analysis in English: evaluate facts, structure, give a score from 1 to 10, and provide useful tips.` 
                    }
                ]
            })
        });

        const data = await res.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            feedbackText.innerHTML = data.choices[0].message.content.replace(/\n/g, '<br>');
        } else if (data.error) {
            feedbackText.innerHTML = `❌ Groq Error: ${data.error.message}`;
        } else {
            feedbackText.innerHTML = "❌ Failed to get a response from Groq. Please check your API key.";
        }
    } catch (err) {
        console.error(err);
        feedbackText.innerHTML = "❌ Network error connecting to Groq API.";
    }
}