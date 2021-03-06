export function setLanguage(value) {
    const language = value;
    if (language === "persian") {
        const language = {
            rtl: true,
            navTitle: "سیستم مدیریت اپیک گیم",
            profile: "مشاهده پروفایل",
            logOut: "خروج",
            epicGameTeam: "تیم اپیک گیم",
            manageTelegram: "مدیریت تلگرام",
            manageChannel: "مدیریت کانال",
            advancedSearch: "جستجو پیشرفته",
            defaultPost: "مشخصات پیش فرض پست",
            defaultPostRegistration: "ثبت مشخصات پیش فرض پست",
            botSetting: "تنظیمات بات",
            botStatus: "وضعیت بات",
            notification: "نوتیفیکیشن",
            sound: "با صدا",
            silent: "بی صدا",
            postCycleTime: "زمان چرخه پست",
            numberOfRegularPost: "تعداد پست عادی",
            numberOfFavouritePost: "تعداد پست برگزیده",
            code: "کد پست",
            content: "متن پست",
            status: "وضعیت",
            posted: "پست شده",
            sold: "فروخته شده",
            registered: "ثبت شده",
            removed: "حذف شده",
            type: "نوع پست",
            favourite: "برگزیده",
            normal: "عادی",
            choose: "انتخاب کنید...",
            creationDate: "تاریخ ایجاد پست",
            lastUpdateDate: "تاریخ اخرین بروز رسانی",
            post: "پست کردن",
            show: "مشاهده",
            history: "تاریخچه",
            showHistory: "نمایش تاریخچه",
            more: "بیشتر",
            silentPosting: "پست کردن بی صدا",
            edit: "ویرایش پست",
            removeFromChannel: "حذف از کانال",
            delete: "حذف پست",
            addPost: "اضافه کردن پست",
            displayPost: "نمایش پست",
            price: "قیمت",
            priceDollar: "قیمت دلار",
            back: "بازگشت",
            search: "جستجو",
            updateDate: "تاریخ بروز رسانی",
            active: "فعال",
            inactive: "غیر فعال",
            title: "عنوان",
            text: "متن",
            add: "اضافه کردن",
            region: "ریجن",
            done: "انجام عملیات",
            tableResult: "موردی یافت نشد",
            writePartOfYourPostContent: "بخشی از متن پست مورد نظر بنویسید ",
            footerText: "تمامی حقوق این سیستم مدیریت محفوظ میباشید",
            notificationSold: "پست با موفقیت به لیست فروخته شده اضافه شد",
            conError: "ارتباط با سرور برقرار نشد",
            svConError: "مشکلی در برقراری با سرور ایجاد شده است",
            partOfThePost: "قسمتی از پست را بنویسید",
            changesSuccessfully: "تغییرات با موفقیت ثبت شد",
            copy: "کپی شد",
            botText: "تنظیمات بات با موفقیت ثبت شد",
            postCycleTimeText: "زمان چرخه پست را وارد کنید",
            normalPostText: "تعداد پست عادی را وارد کنید",
            favouritePostText: "تعداد پست برگزیده را وارد کنید",
            notificationText: "نوع نوتیفیکیشن را انتخاب کنید",
            botStatusText: "وضعیت بات را انتخاب کنید",
            postRegistered: "پست با موفقیت ثبت شد",
            removeText: "پست با موفقیت از کانال حذف شد",
            removeError: "پست فروخته شده را نمیتوان از کانال حذف کرد",
            delError: "پست حذف شده را نمیتوان از کانال حذف کرد",
            postText: "پست با موفقیت پست شد",
            postSoldError: "پست فروخته شده قابل پست کردن نمی باشد",
            postDelError: "پست حذف شده قابل پست کردن نمی باشد",
            delText: "پست با موفقیت حذف شد",
            delSoldError: "پست حذف شده قابل فروش نیست",
            day: "روز",
            night: "شب",
        };
        return language;

    } else if (language === "English") {
        const language = {
            rtl: false,
            navTitle: "EpicGame Management",
            profile: "Profile",
            epicGameTeam: "EpicGame team",
            manageTelegram: "Manage Telegram",
            manageChannel: "Manage channel",
            advancedSearch: "Advanced search",
            defaultPost: "Default post",
            defaultPostRegistration: "Default post registration",
            botSetting: "Bot setting",
            botStatus: "Bot status",
            notification: "Notification",
            sound: "Sound",
            silent: "Silent",
            postCycleTime: "Post cycle time",
            numberOfRegularPost: "Regular post",
            numberOfFavouritePost: "Favourite post",
            code: "Code",
            content: "Content",
            status: "Status",
            posted: "Posted",
            sold: "Sold",
            registered: "Registered",
            removed: "Removed",
            type: "Type",
            favourite: "Favourite",
            normal: "Normal",
            choose: "Choose...",
            creationDate: "Creation date",
            lastUpdateDate: "Last update date",
            post: "Post",
            show: "Show",
            history: "History",
            showHistory: "Show history",
            more: "More",
            silentPosting: "Silent posting",
            edit: "Edit",
            removeFromChannel: "Remove from channel",
            delete: "Delete",
            addPost: "Add post",
            displayPost: "Display post",
            price: "Price",
            priceDollar: "Price dollar",
            back: "Back",
            search: "Search",
            updateDate: "Update date",
            active: "Active",
            inactive: "Inactive",
            title: "Title",
            text: "Text",
            add: "Add",
            done: "Done",
            writePartOfYourPostContent: "Write part of your post content",
            footerText: "All rights reserved",
            tableResult: "There are no results",
            region: "Region",
            notificationSold: "The post was sold",
            conError: "No connection to the server",
            svConError: "There is a problem with the server",
            partOfThePost: "Write a part of the post",
            changesSuccessfully: "The changes were successfully",
            copy: "Copied",
            botText: "The bot settings were successfully",
            postCycleTimeText: "Enter the post cycle time",
            normalPostText: "Enter the number of regular posts",
            favouritePostText: "Enter the number of favourite posts",
            notificationText: "Select the notification type",
            botStatusText: "Select the status of the bot",
            postRegistered: "The post was successfully registered",
            removeText: "The post was removed from the channel",
            removeError: "The sold post cannot be removed from the channel",
            delError: "The deleted post cannot be removed from the channel",
            postText: "The post was successfully posted",
            postSoldError: "Sold post cannot be posted",
            postDelError: "Deleted post cannot be posted",
            delText: "The post was successfully deleted",
            delSoldError: "Deleted post cannot be sold",
            logOut: "Log out",
            day: "Day",
            night: "Night",
        };
        return language;
    }
}


