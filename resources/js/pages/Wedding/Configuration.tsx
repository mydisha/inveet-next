import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Bell,
    Calendar,
    Check,
    ChevronDown,
    Copy,
    Edit,
    Eye,
    EyeOff,
    Gift,
    Heart,
    Home,
    LogOut,
    Menu,
    MessageCircle,
    Monitor,
    Music,
    Quote,
    RotateCcw,
    Settings,
    Shield,
    Type,
    User,
    Users,
    Video,
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
    theme?: {
        id: number;
        name: string;
    };
    package?: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface ConfigurationProps {
    user: {
        id: number;
        name: string;
        email: string;
    };
    wedding: Wedding;
}

export default function Configuration({ user, wedding }: ConfigurationProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isPublished, setIsPublished] = useState(wedding.is_published);
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
                redirectTo: '/',
                showFeedback: true
            });
        } catch (error) {
            console.error('Logout failed:', error);
            // Fallback to form-based logout
            await logout({
                useApi: false,
                redirectTo: '/',
                showFeedback: false
            });
        }
    };

    const navigationItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home, current: false },
        { name: 'My Weddings', href: '/wedding-invitations', icon: Heart, current: false },
        { name: 'Packages', href: '/packages', icon: Settings, current: false },
        { name: 'Orders', href: '/orders', icon: Settings, current: false },
        { name: 'Analytics', href: '/analytics', icon: Settings, current: false },
        { name: 'Settings', href: '/settings', icon: Settings, current: false },
    ];

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    const togglePublish = () => {
        setIsPublished(!isPublished);
        // Here you would make an API call to update the wedding status
    };

    const resetViewCount = () => {
        // Here you would make an API call to reset the view count
    };

    const configurationItems = [
        {
            id: 'couple',
            title: 'Mempelai',
            description: 'Informasi pasangan',
            icon: Heart,
            href: `/wedding/${wedding.id}/couple`,
            color: 'text-blue-600'
        },
        {
            id: 'location',
            title: 'Lokasi & Waktu',
            description: 'Detail acara',
            icon: Calendar,
            href: `/wedding/${wedding.id}/location`,
            color: 'text-green-600',
            isNew: true
        },
        {
            id: 'design',
            title: 'Desain',
            description: 'Tema dan tampilan',
            icon: Monitor,
            href: `/wedding/${wedding.id}/design`,
            color: 'text-purple-600'
        },
        {
            id: 'title',
            title: 'Judul',
            description: 'Judul undangan',
            icon: Type,
            href: `/wedding/${wedding.id}/title`,
            color: 'text-orange-600'
        },
        {
            id: 'music',
            title: 'Musik',
            description: 'Lagu dan audio',
            icon: Music,
            href: `/wedding/${wedding.id}/music`,
            color: 'text-pink-600'
        },
        {
            id: 'protocols',
            title: 'Prokes',
            description: 'Protokol kesehatan',
            icon: Shield,
            href: `/wedding/${wedding.id}/protocols`,
            color: 'text-red-600'
        },
        {
            id: 'quotes',
            title: 'Quotes',
            description: 'Kutipan inspiratif',
            icon: Quote,
            href: `/wedding/${wedding.id}/quotes`,
            color: 'text-indigo-600'
        },
        {
            id: 'streaming',
            title: 'Live Streaming',
            description: 'Siaran langsung',
            icon: Video,
            href: `/wedding/${wedding.id}/streaming`,
            color: 'text-teal-600'
        }
    ];

    return (
        <>
            <Head title={`Wedding Configuration - ${wedding.slug}`} />

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
                                <Link href="/wedding-invitations" className="mr-4">
                                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Back to Invitations
                                    </Button>
                                </Link>
                                <h1 className="text-xl font-bold text-gray-900">
                                    Wedding Configuration
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
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                                        <Heart className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900">
                                            Rafi & Nuna
                                        </h2>
                                        <p className="text-lg text-gray-600">
                                            Wedding Invitation Configuration
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Information Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Left Card - Invitation Details */}
                                <Card className="border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">
                                            Rafi & Nuna
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Wedding URL */}
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <Copy className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm font-medium text-gray-700">
                                                    https://inveet.inveet.id/{wedding.slug}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex space-x-3">
                                            <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white">
                                                <Edit className="mr-2 h-4 w-4" />
                                                Ubah
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => copyToClipboard(`https://inveet.inveet.id/${wedding.slug}`)}
                                                className="border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                                            >
                                                <Copy className="mr-2 h-4 w-4" />
                                                Salin link
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Right Card - Invitation Settings */}
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="space-y-6">
                                            {/* Active Package */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                                                        <Gift className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">Paket Aktif</span>
                                                </div>
                                                <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white">
                                                    Paket Diamond
                                                </Button>
                                            </div>

                                            {/* Publish Status */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                                                        {isPublished ? <Eye className="h-5 w-5 text-primary" /> : <EyeOff className="h-5 w-5 text-primary" />}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">Publikasikan</span>
                                                </div>
                                                <button
                                                    onClick={togglePublish}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                                                        isPublished ? 'bg-primary' : 'bg-gray-200'
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                            isPublished ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                    />
                                                    {isPublished && (
                                                        <Check className="absolute left-1 h-3 w-3 text-white" />
                                                    )}
                                                </button>
                                            </div>

                                            {/* Visitors */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
                                                        <Users className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">Pengunjung</span>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    onClick={resetViewCount}
                                                    className="border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                                                >
                                                    <RotateCcw className="mr-2 h-4 w-4" />
                                                    Reset
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Configuration Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {configurationItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link key={item.id} href={item.href}>
                                            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                                                <CardContent className="p-6 text-center">
                                                    <div className="flex flex-col items-center space-y-3">
                                                        <div className={`h-16 w-16 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                                                            <Icon className={`h-8 w-8 ${item.color}`} />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center justify-center space-x-2">
                                                                <h3 className="text-sm font-semibold text-gray-900">
                                                                    {item.title}
                                                                </h3>
                                                                {item.isNew && (
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                        Baru
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-gray-500">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </main>
                </div>

                {/* Floating WhatsApp Button */}
                <div className="fixed bottom-6 right-6 z-50">
                    <Button
                        size="lg"
                        className="h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <MessageCircle className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </>
    );
}
