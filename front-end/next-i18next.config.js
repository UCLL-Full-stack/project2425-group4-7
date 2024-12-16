module.exports = {
    debug: process.env.NODE_ENV === "Development",
    i18n: {
        defaultLocale: "en",
        locales: ["en", "nl", "de", "fr"],
        localeDetection: false,
    },
    react: {
        suspense: false,
    }
};
