from rest_framework import permissions


class UnAuthenticatedOrAuthorizedStaffCanPostUser(permissions.BasePermission):
    """
    Only unauthenticated users can post (create new model instances)
    Typically used for user registration
    """
    def has_permission(self, request, view):
        # TODO: now only unassigned can add user, need to add authorized staff functionality
        return request.method != 'POST' or not request.user or not request.user.is_authenticated()


class OwnerOrStaffCanViewUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now all authenticated can view all, fix this
        return (not (request.method in permissions.SAFE_METHODS) or
                (request.user and request.user.is_authenticated()))


class StaffCanViewUserList(permissions.BasePermission):
    def has_permission(self, request, view):
        # TODO: now this is loop back, need to fix it
        # check view.action == 'list' or
        # request.method == 'GET' and not 'pk' in view.kwarg
        # to determine if this is list (not retrieve) action
        return True


class AnyCanViewStaffUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now it's only loop back, need to fix this
        # return True if this is not staff account
        return True


class OwnerOrAuthorizedStaffCanEditUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # TODO: now it's only loop back, need to fix this
        return True