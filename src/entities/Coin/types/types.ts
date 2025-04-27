/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CoinsListWithMarketData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null | {
        times: number;
        currency: string;
        percentage: number;
    };
    last_updated: string;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
}

export type ParamsCoinsListWithMarketData = { vs_currency?: string; per_page?: string; page?: number; names?: string[] | string };

export interface CoinByID {
    id: string;
    symbol: string;
    name: string;
    web_slug: string;
    asset_platform_id: string | null;
    platforms: Record<string, string>;
    detail_platforms: Record<string, any>;
    block_time_in_minutes: number;
    hashing_algorithm: string | null;
    categories: string[];
    preview_listing: boolean;
    public_notice: string | null;
    additional_notices: string[];
    localization: Record<string, string>;
    description: Record<string, string>;
    links: {
        homepage: string[];
        whitepaper: string[];
        blockchain_site: string[];
        official_forum_url: string[];
        chat_url: string[];
        announcement_url: string[];
        snapshot_url: string;
        twitter_screen_name: string;
        facebook_username: string;
        bitcointalk_thread_identifier: string;
        telegram_channel_identifier: string;
        subreddit_url: string;
        repos_url: Record<string, string[]>;
    };
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    country_origin: string;
    genesis_date: string | null;
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
    market_cap_rank: number;
    market_data: {
        current_price: Record<string, number>;
        total_value_locked: number | null;
        mcap_to_tvl_ratio: number | null;
        fdv_to_tvl_ratio: number | null;
        roi: number | null;
        ath: Record<string, number>;
        ath_change_percentage: Record<string, number>;
        ath_date: Record<string, string>;
        atl: Record<string, number>;
        atl_change_percentage: Record<string, number>;
        atl_date: Record<string, string>;
        market_cap: Record<string, number>;
        fully_diluted_valuation: Record<string, number>;
        total_volume: Record<string, number>;
        high_24h: Record<string, number>;
        low_24h: Record<string, number>;
        price_change_24h: number;
        price_change_percentage_24h: number;
        price_change_percentage_7d: number;
        price_change_percentage_14d: number;
        price_change_percentage_30d: number;
        price_change_percentage_60d: number;
        price_change_percentage_200d: number;
        price_change_percentage_1y: number;
        market_cap_change_24h: number;
        market_cap_change_percentage_24h: number;
        total_supply: number;
        max_supply: number;
        circulating_supply: number;
        last_updated: string;
    };
    community_data: {
        facebook_likes: number;
        twitter_followers: number;
        reddit_average_posts_48h: number;
        reddit_average_comments_48h: number;
        reddit_subscribers: number;
        reddit_accounts_active_48h: number;
        telegram_channel_user_count: number;
    };
    developer_data: {
        forks: number;
        stars: number;
        subscribers: number;
        total_issues: number;
        closed_issues: number;
        pull_requests_merged: number;
        pull_request_contributors: number;
        code_additions_deletions_4_weeks: {
            additions: number;
            deletions: number;
        };
        commit_count_4_weeks: number;
        last_4_weeks_commit_activity_series: number[];
    };
    status_updates: {
        description: string;
        category: string;
        created_at: string;
    }[];
    last_updated: string;
    tickers: {
        base: string;
        target: string;
        market: {
            name: string;
            identifier: string;
            has_trading_incentive: boolean;
        };
        last: number;
        volume: number;
        converted_last: Record<string, number>;
        converted_volume: Record<string, number>;
        trust_score: string;
        bid_ask_spread_percentage: number;
        timestamp: string;
        last_traded_at: string;
        last_fetch_at: string;
        is_anomaly: boolean;
        is_stale: boolean;
        trade_url: string;
        token_info_url: string;
        coin_id: string;
        target_coin_id: string;
    }[];
}

export interface CoinList {
    id: string;
    symbol: string;
    name: string;
    platforms: Record<string, string>;
}
