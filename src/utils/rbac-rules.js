const rules = {
    pm: {
        static: [
            "projects:new",
            "projects:edit",
            "projects:edit:new",
            "projects:start",
            "projects:close",
            "reports:group",
            "reports:answer"
        ],
    },
    studio: {
        static: [
            "projects:new",
            "projects:edit",
            "projects:edit:new",
            "projects:edit:process",
            "projects:start",
            "projects:close",
            "employee:edit",
            "employee:create",
            "employee:delete",
            "transactions:visit",
            "expenditures:visit",
            "requests:visit",
            "transactions:edit",
            "expenditures:edit",
            "requests:edit",
            "reports:group",
            "reports:answer"
        ]
    }
};

export default rules;