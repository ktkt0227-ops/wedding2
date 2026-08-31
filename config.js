export const weddingConfig = {
  couple: {
    groom: {
      firstName: 'Kosuke',
      fullName: '高橋 幸佑',
    },
    bride: {
      firstName: 'Kokoro',
      fullName: '谷口 こころ',
    },
  },

  date: {
    iso: '2026-11-14',
    englishDay: 'Saturday',
    englishMonth: 'November',
    dayNumber: '14',
    year: '2026',
    japanese: '2026年11月14日（土）',
  },

  replyDeadline: '2026年9月30日（水）までにご回答ください',

  venue: {
    name: 'BVLGARI HOTEL TOKYO',
    address: '東京都中央区八重洲2-2-1\n東京ミッドタウン八重洲',
    access: 'JR東京駅 八重洲南口より直結',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=BVLGARI+HOTEL+TOKYO',
  },

  schedule: [
    {
      time: '14:45',
      title: 'ご来館',
      note: '15:00の挙式に合わせてお越しください',
    },
    { time: '15:00', title: '挙式' },
    { time: '15:30', title: 'カクテルパーティー' },
    { time: '16:00', title: '披露宴' },
    { time: '19:00', title: 'お開き予定' },
  ],

  images: {
    hero: 'https://res.cloudinary.com/edkggmz8/image/upload/f_auto,q_auto,w_1800/v1788179306/IMG_4916.jpg',
    story: 'https://res.cloudinary.com/edkggmz8/image/upload/f_auto,q_auto,w_1800/v1788179306/IMG_4917.jpg',
    ending: 'https://res.cloudinary.com/edkggmz8/image/upload/f_auto,q_auto,w_1800/v1788179306/IMG_4918.jpg',
    og: 'https://res.cloudinary.com/edkggmz8/image/upload/v1788179306/IMG_4916.jpg',
  },
};

export const appsScriptConfig = {
  endpoint: 'https://script.google.com/macros/s/AKfycbzmPoQ2GLJ4zpcSHlB23nRYGbuokp4lCOhm65v8TPjQN6ArcJ-dsfkKQlrzgrP95-kJxQ/exec',
};
