# Admin Panel Permission System

## Overview
The admin panel implements a role-based access control (RBAC) system based on the hierarchy defined in your workflow diagram.

## User Roles & Permissions

### 1. Super Admin (Platform Owner)
- **Description**: Full control over all system components
- **Access**: All admin modules
- **Permissions**:
  - Super Admin panel (`/admin/super`)
  - Mentor Admin panel (`/admin/mentor`)
  - Client Admin panel (`/admin/client`)
  - Global Content Bank (`/admin/content`)
  - Batch & Section Management (`/admin/batches`)

### 2. Mentor Admin
- **Description**: Creates global content
- **Access**: Content management and analytics
- **Permissions**:
  - Mentor Admin panel (`/admin/mentor`)
  - Global Content Bank (`/admin/content`)

### 3. Client Admin
- **Description**: College/company tenant
- **Access**: Tenant-specific management
- **Permissions**:
  - Client Admin panel (`/admin/client`)
  - Global Content Bank (`/admin/content`)
  - Batch & Section Management (`/admin/batches`)

## Permission Matrix

| Module | Super Admin | Mentor Admin | Client Admin |
|--------|-------------|--------------|--------------|
| Super Admin Panel | **Full Access** | No Access | No Access |
| Mentor Admin Panel | **Full Access** | **Full Access** | No Access |
| Client Admin Panel | **Full Access** | No Access | **Full Access** |
| Global Content Bank | **Full Access** | **Full Access** | **View & Assign** |
| Batch & Section Mgmt | **Full Access** | No Access | **Full Access** |

## Implementation Details

### Permission Guard Component
- **Location**: `src/features/admin/components/PermissionGuard.tsx`
- **Purpose**: Protects routes based on user roles
- **Usage**: Wraps admin pages to enforce access control

### Role-Based Navigation
- **Location**: `src/features/admin/components/AdminLayout.tsx`
- **Features**:
  - Dynamic menu rendering based on permissions
  - Role selector for testing different user types
  - Visual indicators for accessible modules

### Access Control
- Each admin page is wrapped with `PermissionGuard`
- Unauthorized users see an access denied page
- Current role is displayed in the header
- Menu items are filtered based on permissions

## Testing Different Roles

### Role-Specific URL Structure

#### Super Admin Layout (Full Access)
- **Super Admin Panel**: `http://localhost:5173/admin/super`
- **Mentor Admin Panel**: `http://localhost:5173/admin/mentor` (Super Admin can access all)
- **Client Admin Panel**: `http://localhost:5173/admin/client` (Super Admin can access all)
- **Global Content Bank**: `http://localhost:5173/admin/content`
- **Batch Management**: `http://localhost:5173/admin/batches`

#### Mentor Admin Layout (Content Management Only)
- **Mentor Admin Panel**: `http://localhost:5173/mentor/mentor`
- **Global Content Bank**: `http://localhost:5173/mentor/content`

#### Client Admin Layout (Tenant Management)
- **Client Admin Panel**: `http://localhost:5173/client/client`
- **Global Content Bank**: `http://localhost:5173/client/content`
- **Batch Management**: `http://localhost:5173/client/batches`

## Security Features

### Frontend Protection
- Route-level permission checking
- Component-level access control
- Dynamic menu filtering
- Visual role indicators

### Access Denied Page
- Clear messaging about permissions
- Current role display
- Required roles information
- Navigation back option

## Future Enhancements

### Backend Integration
- Replace mock role state with authentication context
- Implement JWT-based authentication
- Add API-level permission checking
- Role-based API endpoints

### Advanced Features
- Fine-grained permissions
- Custom roles creation
- Permission inheritance
- Audit logging

## Usage Examples

### Testing Access Control
```typescript
// Current implementation uses mock role
const [userRole, setUserRole] = useState('super_admin')

// Future: Get from auth context
const { user } = useAuth()
const userRole = user.role
```

### Adding New Permissions
```typescript
const menuItems = [
  {
    title: 'New Module',
    icon: 'new_icon',
    path: '/admin/new-module',
    roles: ['super_admin', 'client_admin'], // Define who can access
    description: 'Module description'
  }
]
```

## File Structure
```
src/features/admin/
  components/
    AdminLayout.tsx      # Main layout with role-based navigation
    PermissionGuard.tsx   # Route protection component
  pages/
    SuperAdminPage.tsx    # Super admin dashboard
    MentorAdminPage.tsx   # Mentor admin dashboard
    ClientAdminPage.tsx   # Client admin dashboard
    GlobalContentPage.tsx # Global content management
    BatchManagementPage.tsx # Batch and section management
```

This permission system ensures that each admin role only has access to the modules and features appropriate to their responsibilities as defined in your workflow diagram.
