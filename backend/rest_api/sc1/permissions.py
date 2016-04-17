from rest_framework import permissions


class UnAuthenticatedOrActiveAuthorizedStaffCanPostUser(permissions.BasePermission):
    """
    Only unauthenticated users can post (create new model instances)
    Typically used for user registration
    """
    def has_permission(self, request, view):
        # TODO: now only unassigned can add user, need to add authorized staff functionality
        if request.method != 'POST': return True
        if view.action != 'create': return True
        #return not request.user or not request.user.is_authenticated()
        return True


class OwnerOrActiveStaffCanViewUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now all authenticated can view all, fix this
        return (not (request.method in permissions.SAFE_METHODS) or
                (request.user and request.user.is_authenticated()))


class AnyCanViewStaffUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now it's only loop back, need to fix this
        # return True if this is not staff account
        return True


class OwnerOrActiveAuthorizedStaffCanEditUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now it's only loop back, need to fix this
        # HR can edit all users
        # RA can edit customer users only
        return True


class AuthorizedStaffCanApproveUserPhoto(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now it's only loop back, need to fix this
        # HR can approve staff user's photo
        # staff can approve own photo
        # RA can approve photo of customer users only
        return True


class AuthorizedStaffCanAddOrDeleteUserRight(permissions.BasePermission):
    def has_permission(self, request, view):
        # TODO: now it's only loop back, need to fix this
        # HR and CO can add and delete user rights
        # RA can approve photo of customer users only
        return True
