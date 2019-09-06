import rules from "./rbac-rules";

const check = (rules, roles, action) => {
    let result = false;
    const arrayRoles = JSON.parse(roles);
    if (!arrayRoles) return result;
    arrayRoles.some(role => {
        const permissions = rules[role];
        if (!permissions) {
            return false;
        }
        const staticPermissions = permissions.static;
        if (staticPermissions && staticPermissions.includes(action)) {
            result = true;
            return result;
        }
        return false;
    });
    return result;
};

const Can = props =>
    check(rules, props.roles, props.perform, props.data)
        ? props.yes()
        : props.no();

Can.defaultProps = {
    yes: () => null,
    no: () => null
};

export default Can;