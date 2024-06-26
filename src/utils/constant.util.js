export const getLanguages = () => {
    let languages = ["JavaScript", "TypeScript", "Python", "C++", "C", "Java", "C#", "HTML", "CSS", "Rust", "PHP", "Swift", "GO"];
    return languages;
}

export const getFrameworks = () => {
    let frameworks = ["React Js", "Next Js", "Angular Js", "Vue Js", "Laravel", "Spring Boot", "Django", "Express js", "Flask", "Nuxt js", "Nest js"];
    return frameworks;
}

export const getTools = () => {
    let tools = ["Docker", "Redis", "Ngnix", "jenkins", "trpc", "Postman", "Eraser.io"];
    return tools;
}

export const getDate = (time) => {
    let dateTime = new Date(time);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let month = months[dateTime.getMonth()];
    let date = dateTime.getDate();
    let year = dateTime.getFullYear();

    let hours = (dateTime.getMinutes() < 10) ? "0" + dateTime.getHours() : dateTime.getHours();
    let minutes = (dateTime.getMinutes() < 10) ? "0" + dateTime.getMinutes() : dateTime.getMinutes();

    return { month, date, year, hours, minutes };
}

export const getNewUrl = (url) => {
    url = url.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
    url = url.trim();
    let arr = url.split(" ").join("-");
    return arr;
}

export const getDetailedDate = (time) => {
    let dateTime = new Date(time);

    let month = dateTime.getMonth();
    let date = dateTime.getDate();
    let year = dateTime.getFullYear();

    let dateTimeCurrent = new Date();
    let d = dateTimeCurrent.getDate() - date;
    let y = dateTimeCurrent.getFullYear() - year;
    let m = dateTimeCurrent.getMonth() - month;

    if (y > 0 && m > 0) {
        return `Asked  ${y} years and ${m} months ago`;
    }
    else if (m > 0) {
        return `Asked ${m} months ago`;
    }
    else if (d > 0) {
        return `Asked  ${d} days ago`;
    }
    else {
        return "Asked today";
    }
}
