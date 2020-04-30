const navLinks = [

    {
        path: "/post-management",
        name: "مدیریت کانال",
        icon: "fa fa-telegram",
        type: "telegram-management",
    },
    {
        path: "/advanced-search",
        name: "جستجو پیشرفته",
        icon: "fa fa-search",
        type: "telegram-management",
    },
    {
        path: "/default-post-attributes",
        name: "مشخصات پیش فرض پست",
        icon: "fa fa-archive",
        type: "telegram-management",
    },
    {
        path: "/edit-bot",
        name: "تنظیمات بات",
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

const getNavLinks = () => {
    return [...navLinks];
};

export default getNavLinks;

