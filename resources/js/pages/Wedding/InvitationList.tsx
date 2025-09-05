import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Bell,
    Calendar,
    ChevronDown,
    Copy,
    Edit,
    ExternalLink,
    Eye,
    EyeOff,
    Globe,
    Heart,
    Home,
    LogOut,
    Menu,
    MoreVertical,
    Plus,
    Settings,
    Share2,
    Trash2,
    User,
    X
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { logout } from '../../lib/auth';

interface Wedding {
    id: number;
    slug: string;
    wedding_start: string;
    wedding_end: string;
    view_count: number;
    is_active: boolean;
    is_draft: boolean;
    is_published: boolean;
    cover_photo?: string;
    couple_names?: string;
    theme?: {
        id: number;
        name: string;
        color?: string;
    };
    package?: {
        id: number;
        name: string;
        price?: number;
    };
    created_at: string;
    updated_at: string;
}

interface InvitationListProps {
    user: {
        id: number;
        name: string;
        email: string;
    };
    weddings: Wedding[];
}

export default function InvitationList({ user, weddings }: InvitationListProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Handle click outside sidebar to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setSidebarOpen(false);
            }
        };

        if (sidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarOpen]);

    const handleLogout = async () => {
        try {
            await logout({
                useApi: true,
                redirectTo: '/login',
                showFeedback: true
            });
        } catch (error) {

            // Fallback to form-based logout
            await logout({
                useApi: false,
                redirectTo: '/login',
                showFeedback: false
            });
        }
    };

    const navigationItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home, current: false },
        { name: 'My Weddings', href: '/wedding-invitations', icon: Heart, current: true },
        { name: 'Packages', href: '/packages', icon: Settings, current: false },
        { name: 'Orders', href: '/orders', icon: Settings, current: false },
        { name: 'Analytics', href: '/analytics', icon: Settings, current: false },
        { name: 'Settings', href: '/settings', icon: Settings, current: false },
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    return (
        <>
            <Head title="My Wedding Invitations" />

            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-32 left-16 w-24 h-24 bg-primary-glow/10 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary-light/20 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                {/* Sidebar */}
                <div
                    ref={sidebarRef}
                    className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-primary/20 shadow-lg transform transition-transform duration-300 ease-in-out ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
                >
                    <div className="flex flex-col h-full">
                        {/* Logo */}
                        <div className="flex items-center justify-between h-16 px-6 border-b border-primary/20">
                            <div className="flex items-center">
                                <Link href="/dashboard">
                                    <img
                                        src="/inveet-logo.png"
                                        alt="Inveet.Id"
                                        className="h-8 w-auto hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                                    />
                                </Link>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="lg:hidden text-gray-500 hover:text-gray-700"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-4 py-6 space-y-1">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                            item.current
                                                ? 'bg-gradient-to-r from-primary to-primary-glow text-white shadow-md'
                                                : 'text-gray-600 hover:bg-primary/10 hover:text-primary hover:shadow-sm'
                                        }`}
                                    >
                                        <Icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Profile */}
                        <div className="p-4 border-t border-primary/20">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center shadow-md">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {user?.name || 'Guest User'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {user?.email || 'guest@example.com'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:pl-64">
                    {/* Top Navigation */}
                    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-primary/20 shadow-sm">
                        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="lg:hidden text-gray-600 hover:text-gray-900"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                                <Link href="/dashboard" className="mr-4">
                                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Back to Dashboard
                                    </Button>
                                </Link>
                                <h1 className="text-xl font-bold text-gray-900">
                                    My Wedding Invitations
                                </h1>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Notifications */}
                                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
                                </Button>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                        className="flex items-center space-x-2 hover:bg-primary/10"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center shadow-md">
                                            <User className="h-5 w-5 text-white" />
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-gray-600" />
                                    </Button>

                                    {profileDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-primary/20 py-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                                            >
                                                <User className="mr-3 h-4 w-4" />
                                                Profile
                                            </Link>
                                            <Link
                                                href="/settings"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                                            >
                                                <Settings className="mr-3 h-4 w-4" />
                                                Settings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                                            >
                                                <LogOut className="mr-3 h-4 w-4" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <main className="p-6 lg:p-8">
                        <div className="max-w-7xl mx-auto">
                            {/* Header Section */}
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                    Wedding Invitations
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Manage and configure your wedding invitations
                                </p>
                            </div>

                            {/* Create New Button */}
                            <div className="mb-8">
                                <Link href="/onboarding">
                                    <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white shadow-md hover:shadow-lg transition-all duration-200">
                                        <Plus className="mr-2 h-5 w-5" />
                                        Create New Wedding
                                    </Button>
                                </Link>
                            </div>

                            {/* Wedding Invitations Grid */}
                            {weddings.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {weddings.map((wedding) => (
                                        <Card key={wedding.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                                            {/* Cover Photo */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={wedding.cover_photo || '/api/placeholder/400/300?text=Wedding+Cover'}
                                                    alt={`${wedding.couple_names || 'Wedding'} Cover`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                                {/* Status Badges */}
                                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                                    {wedding.is_published ? (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/90 text-white backdrop-blur-sm">
                                                            <Eye className="h-3 w-3 mr-1" />
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-500/90 text-white backdrop-blur-sm">
                                                            <EyeOff className="h-3 w-3 mr-1" />
                                                            Draft
                                                        </span>
                                                    )}
                                                    {wedding.is_active && (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/90 text-white backdrop-blur-sm">
                                                            Active
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Theme Badge */}
                                                {wedding.theme && (
                                                    <div className="absolute top-4 right-4">
                                                        <span
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
                                                            style={{ backgroundColor: wedding.theme.color + 'CC' }}
                                                        >
                                                            {wedding.theme.name}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Couple Names Overlay */}
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="text-xl font-bold text-white mb-1">
                                                        {wedding.couple_names || `Wedding #${wedding.id}`}
                                                    </h3>
                                                    <p className="text-sm text-white/90">
                                                        {formatDate(wedding.wedding_start)}
                                                    </p>
                                                </div>
                                            </div>

                                            <CardContent className="p-6">
                                                {/* Package Info */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                                                            <Heart className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {wedding.package?.name || 'No Package'}
                                                            </p>
                                                            {wedding.package?.price && (
                                                                <p className="text-xs text-gray-500">
                                                                    Rp {wedding.package.price.toLocaleString('id-ID')}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                {/* Stats */}
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <Eye className="h-4 w-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{wedding.view_count}</p>
                                                            <p className="text-xs text-gray-500">Views</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                            <Calendar className="h-4 w-4 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {new Date(wedding.wedding_start).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                            </p>
                                                            <p className="text-xs text-gray-500">Wedding Date</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Wedding URL */}
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                                        <Globe className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                                        <span className="text-sm font-medium text-gray-700 truncate">
                                                            inveet.inveet.id/{wedding.slug}
                                                        </span>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(`https://inveet.inveet.id/${wedding.slug}`)}
                                                        className="text-primary hover:text-primary/80 flex-shrink-0"
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex space-x-2">
                                                    <Link href={`/wedding/${wedding.id}/configuration`} className="flex-1">
                                                        <Button className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white">
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Configure
                                                        </Button>
                                                    </Link>
                                                    <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
                                                        <Share2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="col-span-full">
                                    <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary-glow/10">
                                        <CardContent className="text-center py-16">
                                            <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                                                <Heart className="h-10 w-10 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No wedding invitations yet</h3>
                                            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                                                Start creating beautiful wedding invitations that your guests will love.
                                                Choose from our stunning templates and customize every detail.
                                            </p>
                                            <Link href="/onboarding">
                                                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                                                    <Plus className="mr-2 h-5 w-5" />
                                                    Create Your First Wedding
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
