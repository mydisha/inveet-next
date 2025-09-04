<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            // User permissions
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',
            'activate-users',
            'deactivate-users',
            'assign-roles',

            // Wedding permissions
            'view-weddings',
            'create-weddings',
            'edit-weddings',
            'delete-weddings',
            'publish-weddings',
            'unpublish-weddings',
            'activate-weddings',
            'deactivate-weddings',

            // Order permissions
            'view-orders',
            'create-orders',
            'edit-orders',
            'delete-orders',
            'process-payments',
            'cancel-orders',
            'mark-orders-paid',
            'mark-orders-void',

            // Package permissions
            'view-packages',
            'create-packages',
            'edit-packages',
            'delete-packages',
            'activate-packages',
            'deactivate-packages',
            'manage-discounts',
            'toggle-recommendations',

            // Special Invitation permissions
            'view-invitations',
            'create-invitations',
            'edit-invitations',
            'delete-invitations',
            'lock-invitations',
            'unlock-invitations',
            'manage-passwords',
            'bulk-create-invitations',

            // Theme permissions
            'view-themes',
            'create-themes',
            'edit-themes',
            'delete-themes',
            'activate-themes',
            'deactivate-themes',

            // System permissions
            'view-statistics',
            'manage-settings',
            'view-logs',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles
        $roles = [
            'super-admin' => $permissions,
            'admin' => [
                'view-users', 'create-users', 'edit-users', 'activate-users', 'deactivate-users', 'assign-roles',
                'view-weddings', 'create-weddings', 'edit-weddings', 'publish-weddings', 'unpublish-weddings',
                'view-orders', 'edit-orders', 'process-payments', 'cancel-orders', 'mark-orders-paid', 'mark-orders-void',
                'view-packages', 'create-packages', 'edit-packages', 'activate-packages', 'deactivate-packages',
                'view-invitations', 'create-invitations', 'edit-invitations', 'lock-invitations', 'unlock-invitations',
                'view-themes', 'create-themes', 'edit-themes', 'activate-themes', 'deactivate-themes',
                'view-statistics', 'manage-settings'
            ],
            'moderator' => [
                'view-users', 'view-weddings', 'edit-weddings', 'publish-weddings', 'unpublish-weddings',
                'view-orders', 'edit-orders', 'process-payments', 'cancel-orders',
                'view-packages', 'view-invitations', 'edit-invitations', 'lock-invitations', 'unlock-invitations',
                'view-themes', 'view-statistics'
            ],
            'customer' => [
                'view-weddings', 'create-weddings', 'edit-weddings', 'publish-weddings', 'unpublish-weddings',
                'view-orders', 'create-orders', 'edit-orders', 'cancel-orders',
                'view-packages', 'view-invitations', 'create-invitations', 'edit-invitations', 'lock-invitations', 'unlock-invitations',
                'view-themes'
            ],
            'guest' => [
                'view-weddings', 'view-packages', 'view-invitations'
            ]
        ];

        foreach ($roles as $roleName => $rolePermissions) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $role->syncPermissions($rolePermissions);
        }

        $this->command->info('Roles and permissions seeded successfully!');
    }
}
