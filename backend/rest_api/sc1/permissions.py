from rest_framework import permissions
from .models import UserRight, RIGHT_CHOICES


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


class AuthorizedStaffCanApproveUserPhoto(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now it's only loop back, need to fix this
        # check if active
        # HR can approve staff user's photo
        # staff can approve own photo
        # RA can approve photo of customer users only
        return True


class AuthorizedStaffCanAddOrDeleteUserRight(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_staff:
            return False
        if not request.user.is_active:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        user_rights = UserRight.objects.filter(user_right_user=request.user)

        # RIGHT_CHOICES[0] - is CO tuple, RIGHT_CHOICES[0][0] - is 'CO' string
        for r in user_rights:
            if r.user_right_text == RIGHT_CHOICES[0][0]:
                # it is CO - allow all rights
                return True

        # RIGHT_CHOICES[3] - is HR tuple, RIGHT_CHOICES[3][0] - is 'HR' string
        for r in user_rights:
            if r.user_right_text == RIGHT_CHOICES[3][0]:
                # it is HR - so only HR(3), TK(4), RA(5), HT(6) are allowed, check it
                return obj.user_right_text in (RIGHT_CHOICES[3][0], RIGHT_CHOICES[4][0], RIGHT_CHOICES[5][0], RIGHT_CHOICES[6][0])

        return False
