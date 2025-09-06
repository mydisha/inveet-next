// Types for wedding invitation themes
export interface WeddingData {
  id: number;
  slug: string;
  title: string;
  groom_name: string;
  bride_name: string;
  groom_photo?: string;
  bride_photo?: string;
  groom_instagram?: string;
  bride_instagram?: string;
  groom_father_name?: string;
  groom_mother_name?: string;
  bride_father_name?: string;
  bride_mother_name?: string;
  wedding_quotes?: string;
  cover_title?: string;
  cover_photo?: string;
  reception_date?: string;
  reception_time?: string;
  reception_place_name?: string;
  reception_location?: string;
  reception_latitude?: number;
  reception_longitude?: number;
  ceremony_date?: string;
  ceremony_time?: string;
  ceremony_place_name?: string;
  ceremony_location?: string;
  ceremony_latitude?: number;
  ceremony_longitude?: number;
  youtube_url?: string;
  wedding_music?: string;
  galleries?: GalleryItem[];
  comments?: Comment[];
  is_countdown_enabled?: boolean;
  is_music_enabled?: boolean;
  is_donation_enabled?: boolean;
  is_show_comment?: boolean;
  is_show_reception?: boolean;
  is_show_ceremony?: boolean;
  is_navigation_enabled?: boolean;
  is_enable_photo?: boolean;
  is_enable_maps?: boolean;
  show_covid_protocol?: boolean;
  covid_protocol_text?: string;
  donation_type?: 'modal' | 'direct';
  default_wallet?: 'inveet' | 'bank';
  max_rsvp?: number;
  name_position?: 'male' | 'female';
  date_format?: string;
  timezone?: string;
  section_couple?: string;
  section_location?: string;
  section_gallery?: string;
  section_donation?: string;
  section_guestbook?: string;
  section_countdown?: string;
  section_navigate_to?: string;
  popup_title?: string;
  popup_for?: string;
  popup_footer?: string;
  popup_button?: string;
  popup_photo?: string;
  livestream_title?: string;
  livestream_description?: string;
  livestream_button?: string;
  information_title?: string;
  section_guestbook_title?: string;
  section_guestbook_name?: string;
  section_guestbook_content?: string;
  section_guestbook_present?: string;
  section_guestbook_no_present?: string;
  section_guestbook_person?: string;
  section_guestbook_send_button?: string;
  section_guestbook_button?: string;
  section_donation_sub?: string;
  section_countdown_days?: string;
  section_countdown_hours?: string;
  section_countdown_minutes?: string;
  section_countdown_seconds?: string;
  reception_type?: string;
  ceremony_type?: string;
  reception_start_time?: string;
  reception_end_time?: string;
  ceremony_start_time?: string;
  ceremony_end_time?: string;
  reception_timezone?: string;
  ceremony_timezone?: string;
  is_show_date_cover?: boolean;
  is_invitation_enabled?: boolean;
  is_navbar_enabled?: boolean;
  is_show_optional_one?: boolean;
  is_show_optional_two?: boolean;
  optional_one_type?: string;
  optional_one_place_name?: string;
  optional_one_location?: string;
  optional_one_date?: string;
  optional_one_start_time?: string;
  optional_one_end_time?: string;
  optional_one_timezone?: string;
  optional_two_type?: string;
  optional_two_place_name?: string;
  optional_two_location?: string;
  optional_two_date?: string;
  optional_two_start_time?: string;
  optional_two_end_time?: string;
  optional_two_timezone?: string;
  information_type?: string;
}

export interface GalleryItem {
  id: number;
  filename: string;
  alt_text?: string;
  order?: number;
}

export interface Comment {
  id: number;
  name: string;
  comment: string;
  created_at: string;
  is_present?: boolean;
  guest_count?: number;
}

export interface InvitationData {
  name: string;
  is_vip?: boolean;
  session?: {
    session_name: string;
    start_time: string;
    end_time: string;
  };
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textLight: string;
    // New text color options
    primaryText?: string;
    secondaryText?: string;
    tertiaryText?: string;
    // Button colors
    buttonPrimary?: string;
    buttonSecondary?: string;
    buttonText?: string;
    [key: string]: string | undefined; // Allow additional color properties
  };
  fonts: {
    heading: string;
    body: string;
    script: string;
    // New font options for buttons and sections
    button?: string;
    sectionHeading?: string;
    sectionBody?: string;
    [key: string]: string | undefined; // Allow additional font properties
  };
  assets: {
    coverBackground?: string;
    decorativeElements?: string[];
    icons?: Record<string, string>;
  };
  layout: {
    coverHeight: 'full' | 'half' | 'custom';
    coupleLayout: 'side-by-side' | 'stacked' | 'overlay';
    locationLayout: 'cards' | 'list' | 'timeline';
    galleryLayout: 'grid' | 'masonry' | 'carousel';
  };
}

export interface DesignCustomization {
  // Font customizations
  buttonFont: string;
  sectionHeadingFont: string;
  sectionBodyFont: string;

  // Text color customizations
  primaryTextColor: string;
  secondaryTextColor: string;
  tertiaryTextColor: string;

  // Button color customizations
  buttonPrimaryColor: string;
  buttonSecondaryColor: string;
  buttonTextColor: string;

  // Additional customization options
  customCSS?: string;
}

export interface InvitationThemeProps {
  wedding: WeddingData;
  invitation?: InvitationData;
  theme: ThemeConfig;
  onOpenInvitation?: () => void;
  onMusicToggle?: (isPlaying: boolean) => void;
  onRSVPSubmit?: (data: RSVPData) => void;
  onCommentSubmit?: (data: CommentData) => void;
  onDonationClick?: () => void;
  isPreview?: boolean;
}

export interface RSVPData {
  name: string;
  comment: string;
  is_present: boolean;
  guest_count: number;
}

export interface CommentData {
  name: string;
  comment: string;
}

export interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  musicUrl?: string;
}

export interface CountdownProps {
  targetDate: string;
  labels: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
}

export interface LocationCardProps {
  type: string;
  placeName: string;
  location: string;
  date: string;
  time: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
  onNavigate?: () => void;
  showMap?: boolean;
}

export interface CoupleInfoProps {
  groom: {
    name: string;
    photo?: string;
    instagram?: string;
    fatherName?: string;
    motherName?: string;
  };
  bride: {
    name: string;
    photo?: string;
    instagram?: string;
    fatherName?: string;
    motherName?: string;
  };
  quotes?: string;
  namePosition: 'male' | 'female';
  showPhotos: boolean;
}

export interface GalleryProps {
  galleries: GalleryItem[];
  youtubeUrl?: string;
  onImageClick?: (index: number) => void;
}

export interface GuestbookProps {
  comments: Comment[];
  onSubmit: (data: CommentData) => void;
  maxRsvp?: number;
  isInvitationEnabled?: boolean;
  labels: {
    title: string;
    name: string;
    content: string;
    present: string;
    notPresent: string;
    person: string;
    send: string;
    button: string;
  };
}

export interface DonationProps {
  type: 'modal' | 'direct';
  defaultWallet: 'inveet' | 'bank';
  onSubmit: () => void;
  labels: {
    title: string;
    subtitle: string;
    button: string;
  };
}
