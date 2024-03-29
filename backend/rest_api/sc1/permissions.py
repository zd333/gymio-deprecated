from rest_framework import permissions
from .models import UserRole


class UnAuthenticatedOrAuthorizedStaffCanPostUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method != 'POST':
            return True
        if view.action != 'create':
            return True

        if not request.user or not request.user.is_authenticated():
            # check if unauthenticated doesn't try to post active or staff
            if 'is_active' in request.data or 'is_staff' in request.data:
                return False
            else:
                return True

        if not request.user.is_staff or not request.user.is_active:
            return False

        user_roles = UserRole.objects.filter(role_user=request.user)
        for r in user_roles:
            if r.role_text in ['CO', 'HR', 'RA']:
                # it is RA or CO - allow
                return True

        return False


class OwnerCanEditUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if view.action != 'update':
            return True

        if not request.user or not request.user.is_authenticated() or not request.user.is_active:
            return False
        if request.user.id != obj.id:
            # this is not owner, other permission classes will verify rights
            return True

        # check if it doesn't try to change own is_active or is_staff property
        if 'is_active' in request.data or 'is_staff' in request.data:
            return False
        return True


class StaffCanViewCustomerAnyCanViewStaff(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # active staff can view customers
        if view.action not in ['retrieve', 'list']:
            return True
        if obj.is_staff:
            return True
        if not request.user or not request.user.is_authenticated() or not request.user.is_active or not request.user.is_staff:
            return False

        return True


class AuthorizedStaffCanEditCustomer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # CO, RA and HR can edit customer users
        # CO and HR can edit everything in customer
        # RA is not allowed to change is_staff
        # owner can edit itself except is_staff and is_active
        if view.action != 'update':
            return True
        if obj.is_staff:
            return True

        if not request.user or not request.user.is_authenticated() or not request.user.is_active or not request.user.is_staff:
            return False

        user_roles = UserRole.objects.filter(role_user=request.user)

        for r in user_roles:
            if r.role_text in ['CO', 'HR']:
                # it is CO or HR - allow edit everything in customer user
                return True

        for r in user_roles:
            if r.role_text == 'RA':
                # it is RA - check if he is not trying to set is_staff
                if 'is_staff' not in request.data:
                    return False
                return True

        return False


class AuthorizedStaffCanEditStaffUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # CO and HR can edit staff users
        # HR can't edit CO
        if view.action != 'update':
            return True
        if not obj.is_staff:
            return True

        if not request.user or not request.user.is_authenticated() or not request.user.is_active or not request.user.is_staff:
            return False

        # check if staff user edits own profile
        if request.user.id == obj.id:
            if 'is_staff' in request.data or 'is_active' in request.data:
                return False
            else:
                return True

        user_roles = UserRole.objects.filter(role_user=request.user)

        for r in user_roles:
            if r.role_text == 'CO':
                # it is CO allow everything
                return True

        for r in user_roles:
            if r.role_text == 'HR':
                # it is HR, check if he doesn't try to edit CO
                obj_roles = UserRole.objects.filter(role_user=obj)
                for rr in obj_roles:
                    if rr.role_text == 'CO':
                        # HR can't edit CO
                        return False
                return True

        return False


class AuthorizedStaffCanAddOrDeleteUserRole(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated() or not request.user.is_staff or not request.user.is_active:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        # do not check user (authenticated, active, staff), because it was done in has_permission method
        user_roles = UserRole.objects.filter(role_user=request.user)

        for r in user_roles:
            if r.role_text == 'CO':
                # it is CO - allow all roles
                return True

        for r in user_roles:
            if r.role_text == 'HR':
                # it is HR - so EI(2), FK(1) are not allowed
                return obj.role_text not in ('EI', 'FK')

        return False


class AuthorizedStaffCanCreateAndEditWorkoutTypes(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action not in ['create', 'update']:
            return True

        if not request.user or not request.user.is_authenticated() or not request.user.is_staff or not request.user.is_active:
            return False

        user_roles = UserRole.objects.filter(role_user=request.user)

        for r in user_roles:
            if r.role_text in ['CO', 'HT']:
                return True

        return False
