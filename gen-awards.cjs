const fs = require('fs');

let raw = fs.readFileSync('awards (1).json', 'utf8');
// Fix unescaped newlines in strings
let data;
try {
    // using regex to find newlines inside strings. Or simply eval since it is JS-like.
    // Replace newlines inside strings with spaces
    raw = raw.replace(/\n(?= *[a-zA-Z])/g, ' ').replace(/\n *(?=\")/g, ' ');
    data = eval(raw);
} catch (e) {
    console.error(e);
}

const nameMap = {
    'award_2025_region8.jpg': '/assets/awards/awards_section/Large_chapter_award.webp',
    'award_2025_isv.jpg': '/assets/awards/iastam.webp',
    'award_2025_ahmed_jallouli.jpg': '/assets/awards/awards_section/hamza_gharsellaoui.webp',
    'award_2025_hamza_gharsellaoui.jpg': '/assets/awards/OutstandingChapter.webp',
    'award_2024_large_chapter.jpg': '/assets/awards/awards_section/amir_abid.webp',
    'award_2024_amir_abid.jpg': '/assets/awards/awards_section/best_website.webp',
    'award_2024_website.jpg': '/assets/awards/awards_section/humanitarian_.webp',
    'award_2024_humanitarian.jpg': '/assets/awards/anmeeting1.webp',
    'award_2024_nontechnical.jpg': '/assets/awards/bestiast.webp',
    'award_2022_web_contest.jpg': '/assets/awards/Best Website.webp',
    'award_2022_tsyp10.jpg': '/assets/awards/tsyp3.webp',
    'award_2021_tsyp8.jpg': '/assets/awards/tsyp1.webp',
    'award_2021_tsyp8_challenge.jpg': '/assets/awards/tsyp2.webp',
    'award_2021_iastam.jpg': '/assets/awards/iastam2.webp',
    'award_2021_gmp.jpg': '/assets/awards/anmeeting2.webp',
    'award_2019_web.jpg': '/assets/awards/tsyp4.webp',
    'award_2018_web.jpg': '/assets/awards/tsyp5.webp'
};

if (data) {
    const finalData = data.map((d, i) => {
        let photoName = d.photo.replace('images/', '');
        let mappedPhoto = nameMap[photoName] || '/assets/awards/Best Website.webp';
        return {
            id: i + 1,
            title: d.title,
            year: d.year,
            description: d.description.replace(/\s+/g, ' ').trim(),
            photo: mappedPhoto
        };
    });

    fs.writeFileSync('src/data/achievements.json', JSON.stringify(finalData, null, 2));
    console.log('Achievements JSON generated.');
}
