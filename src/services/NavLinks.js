const navLinks = [

    {
        path: "/product-category",
        name: "مدیریت اکانت",
        icon: "fa fa-gamepad",
        type:"management",
    },{
        path: "/not-found",
        name: "به زودی",
        icon: "fa fa-question",
        type:"management",
    },

];

const getNavLinks = () => {
    return [...navLinks];
};

export default getNavLinks;

