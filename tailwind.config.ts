import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./resources/**/*.{ts,tsx,js,jsx,blade.php}",
		"./resources/js/**/*.{ts,tsx,js,jsx}",
		"./resources/views/**/*.blade.php",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					light: 'hsl(var(--primary-light))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				warm: {
					DEFAULT: 'hsl(var(--warm))',
					foreground: 'hsl(var(--warm-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.05)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'float-1': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'25%': { transform: 'translateY(-15px) rotate(90deg)' },
					'50%': { transform: 'translateY(-25px) rotate(180deg)' },
					'75%': { transform: 'translateY(-15px) rotate(270deg)' }
				},
				'float-2': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
					'33%': { transform: 'translateY(-20px) rotate(120deg) scale(1.1)' },
					'66%': { transform: 'translateY(-10px) rotate(240deg) scale(0.9)' }
				},
				'float-3': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
					'25%': { transform: 'translateY(-18px) translateX(10px)' },
					'50%': { transform: 'translateY(-30px) translateX(0px)' },
					'75%': { transform: 'translateY(-18px) translateX(-10px)' }
				},
				'float-4': {
					'0%, 100%': { transform: 'translateY(0px) scale(1)' },
					'50%': { transform: 'translateY(-22px) scale(1.15)' }
				},
				'particle': {
					'0%': { opacity: '0', transform: 'translateY(0) scale(0)' },
					'50%': { opacity: '1', transform: 'translateY(-100px) scale(1)' },
					'100%': { opacity: '0', transform: 'translateY(-200px) scale(0)' }
				},
				'glow-orb': {
					'0%, 100%': { opacity: '0.3', transform: 'scale(1) rotate(0deg)' },
					'50%': { opacity: '0.6', transform: 'scale(1.2) rotate(180deg)' }
				},
				'text-reveal': {
					'0%': { opacity: '0', transform: 'translateY(100%)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'parallax-slow': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'parallax-medium': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-15px)' }
				},
				'parallax-fast': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-25px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'slide-up': 'slide-up 0.8s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
				'slide-in-left': 'slide-in-left 0.8s ease-out forwards',
				'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
				'float-1': 'float-1 8s ease-in-out infinite',
				'float-2': 'float-2 10s ease-in-out infinite',
				'float-3': 'float-3 12s ease-in-out infinite',
				'float-4': 'float-4 9s ease-in-out infinite',
				'particle': 'particle 3s ease-out infinite',
				'glow-orb': 'glow-orb 6s ease-in-out infinite',
				'text-reveal': 'text-reveal 1s ease-out forwards',
				'parallax-slow': 'parallax-slow 8s ease-in-out infinite',
				'parallax-medium': 'parallax-medium 6s ease-in-out infinite',
				'parallax-fast': 'parallax-fast 4s ease-in-out infinite'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
