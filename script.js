// بيانات المستخدمين
const accounts = {
    "1001": { 
        pass: "pass1", 
        role: "student",
        name: "أحمد علي",
        grade: "الصف الأول الثانوي",
        section: "أ",
        health: "جيد",
        rating: 4.5,
        achievements: ["فاز بمسابقة الرياضيات", "شارك في معرض العلوم"]
    },
    "1002": { 
        pass: "pass2", 
        role: "student",
        name: "سارة محمد",
        grade: "الصف الثاني الثانوي",
        section: "ب",
        health: "جيد",
        rating: 4.2,
        achievements: ["حصلت على شهادة التفوق", "مشاركة في النشاط الفني"]
    }
};

// تسجيل الدخول
function login() {
    let code = document.getElementById("code").value.trim();
    let pass = document.getElementById("password").value;

    if (!code || !pass) { alert("من فضلك أدخل الكود وكلمة السر"); return; }

    if (accounts[code] && accounts[code].pass === pass) {
        localStorage.setItem("loggedInUser", code);
        showHome(code);
    } else {
        alert("الكود أو كلمة السر غير صحيحة");
    }
}

// عرض الشاشة الرئيسية وبيانات المستخدم
function showHome(code) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");

    const user = accounts[code];
    const userDiv = document.getElementById("user-info");
    userDiv.innerHTML = `
        <div class="user-card">
            <h3>مرحبا، ${user.name}</h3>
            <p>الصف: ${user.grade}</p>
            <p>الفرقة: ${user.section}</p>
            <p>الحالة الصحية: ${user.health}</p>
            <p>التقييم: ${user.rating}</p>
            <h4>إنجازاته:</h4>
            <ul>${user.achievements.map(a => `<li>${a}</li>`).join("")}</ul>
        </div>
    `;
}

// حفظ الجلسة عند فتح الموقع
window.onload = function() {
    const code = localStorage.getItem("loggedInUser");
    if (code && accounts[code]) {
        showHome(code);
    }
}

// تسجيل خروج
function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

// فتح الصفحات الخارجية والخدمات
function openPage(name) {
    const links = {
        "وزارة": "https://ellibrary.moe.gov.eg/books/",
        "مسابقات": "https://ellibrary.moe.gov.eg/books/",
        "مبادراتنا": "https://t.me/nasr_military_students_bot", // الآراء + المبادرات
        "اعلانات": "https://whatsapp.com/channel/0029VbBX4wo1SWstPmiejS0F",
        "حالة": "" // بيانات الحالة تظهر مباشرة، لا رابط خارجي
    };

    if(name === "حالة") {
        const code = localStorage.getItem("loggedInUser");
        if(code && accounts[code]) showHome(code);
        else alert("من فضلك سجل دخول أولاً");
        return;
    }

    if(links[name]) {
        window.location.href = links[name];
    } else {
        alert("الرابط غير موجود");
    }
                       }
