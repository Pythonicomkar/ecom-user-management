from django.urls import path
from .views import (LoginView, 
                    RegisterView,
                    AdminUserListView,
                    ToggleUserStatusView,
                    UserProfileView)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    
    
    # Admin APIs
    path('admin/users/', AdminUserListView.as_view()),
    path('admin/user/<int:user_id>/status/', ToggleUserStatusView.as_view()),
    
    # User Profile API
    path('profile/', UserProfileView.as_view()),

]
