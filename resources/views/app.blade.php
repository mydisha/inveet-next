<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Primary Meta Tags -->
        <title>@yield('title', 'Inveet - Digital Wedding Invitations & Event Management Platform')</title>
        <meta name="title" content="@yield('title', 'Inveet - Digital Wedding Invitations & Event Management Platform')">
        <meta name="description" content="@yield('description', 'Create beautiful digital wedding invitations, manage RSVPs, and organize your special day with Inveet. Modern, elegant, and easy-to-use wedding planning platform.')">
        <meta name="keywords" content="@yield('keywords', 'digital wedding invitations, wedding RSVP, wedding planning, online wedding invites, wedding website, wedding management, digital invites, wedding organization, wedding platform, wedding technology')">
        <meta name="author" content="Inveet">
        <meta name="robots" content="index, follow">
        <meta name="language" content="English">
        <meta name="revisit-after" content="7 days">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="@yield('og_title', 'Inveet - Digital Wedding Invitations & Event Management')">
        <meta property="og:description" content="@yield('og_description', 'Create beautiful digital wedding invitations, manage RSVPs, and organize your special day with Inveet.')">
        <meta property="og:image" content="@yield('og_image', url('/images/og-image.jpg'))">
        <meta property="og:site_name" content="Inveet">
        <meta property="og:locale" content="en_US">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ url()->current() }}">
        <meta property="twitter:title" content="@yield('twitter_title', 'Inveet - Digital Wedding Invitations')">
        <meta property="twitter:description" content="@yield('twitter_description', 'Create beautiful digital wedding invitations and manage your special day with Inveet.')">
        <meta property="twitter:image" content="@yield('twitter_image', url('/images/twitter-image.jpg'))">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Additional SEO Meta Tags -->
        <meta name="theme-color" content="#8B5CF6">
        <meta name="msapplication-TileColor" content="#8B5CF6">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="Inveet">

        <!-- Canonical URL -->
        <link rel="canonical" href="{{ url()->current() }}">

        <!-- Favicon and Icons -->
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="manifest" href="/manifest.json">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700" rel="stylesheet" />

        <!-- Vite Assets -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
