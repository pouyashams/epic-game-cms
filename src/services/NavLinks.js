const navLinks = [

    {
        path: "/acount-managemnet",
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

