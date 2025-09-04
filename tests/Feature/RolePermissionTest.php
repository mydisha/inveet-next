<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

test('user can be assigned a role', function () {
    $user = User::factory()->create();
    $role = Role::create(['name' => 'test-role']);

    $user->assignRole($role);

    expect($user->hasRole('test-role'))->toBeTrue();
});

test('user can have multiple roles', function () {
    $user = User::factory()->create();
    $role1 = Role::create(['name' => 'role-1']);
    $role2 = Role::create(['name' => 'role-2']);

    $user->assignRole([$role1, $role2]);

    expect($user->hasRole(['role-1', 'role-2']))->toBeTrue();
});

test('user can be assigned permissions', function () {
    $user = User::factory()->create();
    $permission = Permission::create(['name' => 'test-permission']);

    $user->givePermissionTo($permission);

    expect($user->hasPermissionTo('test-permission'))->toBeTrue();
});

test('role can have permissions', function () {
    $role = Role::create(['name' => 'test-role']);
    $permission = Permission::create(['name' => 'test-permission']);

    $role->givePermissionTo($permission);

    expect($role->hasPermissionTo('test-permission'))->toBeTrue();
});

test('user inherits permissions from role', function () {
    $user = User::factory()->create();
    $role = Role::create(['name' => 'test-role']);
    $permission = Permission::create(['name' => 'test-permission']);

    $role->givePermissionTo($permission);
    $user->assignRole($role);

    expect($user->hasPermissionTo('test-permission'))->toBeTrue();
});

test('super admin has all permissions', function () {
    // Seed roles and permissions first
    $this->seed(\Database\Seeders\RolePermissionSeeder::class);

    $user = User::factory()->create();
    $user->assignRole('super-admin');

    expect($user->hasPermissionTo('view-users'))->toBeTrue();
    expect($user->hasPermissionTo('create-weddings'))->toBeTrue();
    expect($user->hasPermissionTo('delete-orders'))->toBeTrue();
});
