from rest_framework import permissions
from .models import UserRole, ROLE_CHOICES


class UnAuthenticatedOrAuthorizedStaffCanPostUser(permissions.BasePermission):
    def has_permission(self, request, view):
        # TODO: now only unassigned can add user, need to add authorized staff functionality
        # check if active
        if request.method != 'POST':
            return True
        if view.action != 'create':
            return True
        #return not request.user or not request.user.is_authenticated()
        return True


class StaffCanViewCustomer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now all authenticated can view all, fix this
        # check if active
        # active staff can view customers
        return (not (request.method in permissions.SAFE_METHODS) or
                (request.user and request.user.is_authenticated()))


class AnyCanViewStaffUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now it's only loop back, need to fix this
        # return True if this is not staff account
        return True


class AuthorizedStaffCanEditCustomer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now it's only loop back, need to fix this
        # check if active
        # CO and RA can edit customer users
        # check if they don't try to change is_staff
        return True


class AuthorizedStaffCanEditStaffUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now it's only loop back, need to fix this
        # check if active
        # CO and HR can edit staff users
        # HR can't edit CO
        # allow CO and HR set is_staff for customer users
        return True


class AuthorizedStaffCanAddOrDeleteUserRole(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_staff:
            return False
        if not request.user.is_active:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        user_roles = UserRole.objects.filter(role_user=request.user)

        # ROLE_CHOICES[0] - is CO tuple, ROLE_CHOICES[0][0] - is 'CO' string
        for r in user_roles:
            if r.role_text == ROLE_CHOICES[0][0]:
                # it is CO - allow all roles
                return True

        # ROLE_CHOICES[3] - is HR tuple, ROLE_CHOICES[3][0] - is 'HR' string
        for r in user_roles:
            if r.role_text == ROLE_CHOICES[3][0]:
                # it is HR - so EI(2), FK(1) are not allowed
                return obj.role_text not in (ROLE_CHOICES[1][0], ROLE_CHOICES[2][0])

        return False
