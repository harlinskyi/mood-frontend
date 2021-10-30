export default function t(string) {
    if (string === undefined) { return }
    const language = localStorage.language;
    let str = string;
    if (language === 'UA') {
        UA.forEach((arr, index) => {
            if (arr[0] === str) str = arr[1];
        })
    }
    return str;
}


const UA = [
    ["Login", "Вхід"],
    ["Log in", "Увійти"],
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
    ["Settings", "Налаштування"],
    ["Create post", "Створити допис"],
    ["Email incorrectly specified.", "Ел. пошта вказано невірно."],
    ["Email is required field to fill.", "Ел. пошта є обов'язкове до заповення."],
    ["Password is required field to fill.", "Пароль є обов'язковим для заповнення."],
    ["Password length must be min 8 chars.", "Довжина пароля повинна бути не менше 8 символів."],
    ["Invalid email or password", "Ел. пошта або пароль є невірними."],
    ["Password must contain numbers.", "Пароль повинен містити цифри."],
    ["Password must contain uppercase letters.", "Пароль повинен містити літери верхнього регістру."],
    ["Password must contain lowercase letters.", "Пароль повинен містити літери нижнього регістру."]
]