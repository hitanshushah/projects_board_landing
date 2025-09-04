
export interface Auth {
    user: User;
    profile?: Profile;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    username: string | null;
    created_at: string;
    updated_at: string;
}

export interface Profile {
    id: number;
    name: string | null;
    designation: string | null;
    bio: string | null;
    street: string | null;
    city: string | null;
    province: string | null;
    country: string | null;
    profile_photo_url?: string | null;
    public_url?: string | null;
    share_profile?: boolean;
    links?: ProjectLink[];
    documents?: ProjectAsset[];
}

export interface Category {
    id?: number;
    name: string;
    key: string;
    user_id?: number | null;
}

export interface Status {
    name: string;
    key: string;
    is_active?: boolean;
}

export interface ProjectLink {
    id?: number;
    title: string;
    url: string;
    type?: string;
}

export interface ProjectAsset {
    id?: number;
    name?: string;
    path?: string;
    size?: number;
    type?: string;
    url?: string;
    filename?: string; 
    display_name?: string; 
    asset_type?: {
        key: string;
        name: string;
    };
}

export interface ProjectSettings {
    showDescription?: boolean;
    showCategory?: boolean;
    showStatus?: boolean;
    showDates?: boolean;
    showTags?: boolean;
    showTechnologies?: boolean;
    showLinks?: boolean;
    showAssets?: boolean;
}

export interface Project {
    id?: number;
    name: string;
    description?: string;
    category?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    is_public?: boolean;
    tags?: string[];
    technologies?: string[];
    links?: ProjectLink[];
    assets?: ProjectAsset[];
    settings?: ProjectSettings;
    created_at?: string;
    updated_at?: string;
}

export type BreadcrumbItemType = BreadcrumbItem;


interface ImportMetaEnv {
  readonly VITE_SIGN_IN_URL: string
  readonly VITE_GITHUB_URL: string
  readonly VITE_LINKEDIN_URL: string
  readonly VITE_WEBSITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
