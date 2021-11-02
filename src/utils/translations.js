export default function t(string) {
    if (string === undefined) { return }
    const language = localStorage.language;
    let str = string;
    if (language === 'ua') {
        UA.forEach((arr, index) => {
            if (arr[0] === str) str = arr[1];
        })
    }
    return str;
}


const UA = [
    ["Login", "Вхід"],
    ["Log in", "Увійти"],
    ["Sign out", "Вихід"],
    ["Registration", "Реєстрація"],
    ["Register", "Зареєструватись"],
    ["Password", "Пароль"],
    ["Peoples", "Люди"],
    ["Email", "Ел. пошта"],
    ["My Profile", "Мій Профіль"],
    ["Profile", "Профіль"],
    ["Description", "Опис"],
    ["New post", "Новий допис"],
    ["Close", "Закрити"],
    ["Create", "Створити"],
    ["Female", "Жінка"],
    ["Male", "Чоловік"],
    ["Site", "Сайт"],
    ["First Name", "Ім'я"],
    ["Last Name", "Прізвище"],
    ["Nickname", "Нікнейм"],
    ["Quote", "Цитата"],
    ["Gender", "Стать"],
    ["Birthday", "День народження"],
    ["Country", "Країна"],
    ["View", "Переглянути"],
    ["Not registered?", "Не зареєстрований?"],
    ["Forgot your password?", "Забули пароль?"],
    ["Save settings", "Зберегти налаштування"],
    ["Settings", "Налаштування"],
    ["Create post", "Створити допис"],
    ["Are you sure you want to delete this article?", "Ви дійсно хочете видалити цю статтю?"],
    ["Email incorrectly specified.", "Ел. пошта вказано невірно."],
    ["Email is required field to fill.", "Ел. пошта є обов'язкове до заповення."],
    ["Password is required field to fill.", "Пароль є обов'язковим для заповнення."],
    ["Password length must be min 8 chars.", "Довжина пароля повинна бути не менше 8 символів."],
    ["Invalid email or password", "Ел. пошта або пароль є невірними."],
    ["Password must contain numbers.", "Пароль повинен містити цифри."],
    ["Password must contain uppercase letters.", "Пароль повинен містити літери верхнього регістру."],
    ["Password must contain lowercase letters.", "Пароль повинен містити літери нижнього регістру."],
    ["Registration with email", "Реєстрація з ел. почтою"],
    ["was successful, please", "була успішна, будь ласка"],
    ["log in", "авторизуйтесь"],
    ["Please, select from list", "Будь ласка, оберіть із списку"]
]