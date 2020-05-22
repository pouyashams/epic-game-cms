const getNavLinks = (language) => {
    const navLinks = [
        {
            path: "/post-management",
            name: language.manageChannel,
            icon: "fa fa-telegram",
            type: "telegram-management",
        },
        {
            path: "/advanced-search",
            name: language.advancedSearch,
            icon: "fa fa-search",
            type: "telegram-management",
        },
        {
            path: "/default-post-attributes",
            name: language.defaultPost,
            icon: "fa fa-archive",
            type: "telegram-management",
        },
        {
            path: "/edit-bot",
            name: language.botSetting,
            icon: "fa fa-cog",
            type: "telegram-management",
        },

        // {
        //     path: "/not-found",
        //     name: "به زودی",
        //     icon: "fa fa-question",
        //     type: "instagram-management",
        // },{
        //     path: "/not-found",
        //     name: "به زودی",
        //     icon: "fa fa-question",
        //     type: "instagram-management",
        // },


    ];
    return [...navLinks];
};

export default getNavLinks;

