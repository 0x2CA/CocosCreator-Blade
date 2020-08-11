package com.external.jsapi;

import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;

import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.InterstitialAd;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.reward.RewardItem;
import com.google.android.gms.ads.reward.RewardedVideoAd;
import com.google.android.gms.ads.reward.RewardedVideoAdListener;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxHelper;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

public class AdmobHelper {
    private static RewardedVideoAd rewardedVideoAd = null;
    private static AdView bannerAdView = null;
    private static InterstitialAd interstitialAd = null;
    private  static String testDeviceID="63DB8A0AD669D80FE3A62C927E8B08F9";

    /**
     * 初始化
     * @param appid
     * @param bannerId
     * @param interstitialId
     */
    public static void initialize(String appid, String bannerId, String interstitialId) {
        // 初始化appid
        MobileAds.initialize(Cocos2dxActivity.getContext(), appid);

        // 初始化视频广告
        AdmobHelper.createRewardedVideo();

        // 初始化横幅广告
        AdmobHelper.createBanner(bannerId);

        // 初始化插页广告
        AdmobHelper.createInterstitial(interstitialId);
    }

    /**
     * 创建视频广告
     */
    private static void createRewardedVideo() {
        AdmobHelper.rewardedVideoAd = MobileAds.getRewardedVideoAdInstance(Cocos2dxActivity.getContext());
        Cocos2dxHelper.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AdmobHelper.rewardedVideoAd.setRewardedVideoAdListener(new RewardedVideoAdListener() {
                    @Override
                    public void onRewardedVideoAdLoaded() {
                        AdmobHelper.callJS("onRewardedVideoAdLoaded");
                    }

                    @Override
                    public void onRewardedVideoAdFailedToLoad(int i) {
                        AdmobHelper.callJS("onRewardedVideoAdFailedToLoad", new Object[]{new Integer(i)});
                    }

                    @Override
                    public void onRewardedVideoAdOpened() {
                        AdmobHelper.callJS("onRewardedVideoAdOpened");
                    }

                    @Override
                    public void onRewardedVideoStarted() {
                        AdmobHelper.callJS("onRewardedVideoStarted");
                    }

                    @Override
                    public void onRewardedVideoAdClosed() {
                        AdmobHelper.callJS("onRewardedVideoAdClosed");
                    }

                    @Override
                    public void onRewarded(RewardItem rewardItem) {
                        AdmobHelper.callJS("onRewardedVideoRewarded");
                    }

                    @Override
                    public void onRewardedVideoAdLeftApplication() {

                    }

                    @Override
                    public void onRewardedVideoCompleted() {

                    }
                });
            }
        });
    }

    /**
     * 创建横幅广告
     * @param bannerId
     */
    private static void createBanner(final String bannerId) {
        Cocos2dxHelper.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (AdmobHelper.bannerAdView != null) {
                    AdmobHelper.bannerAdView.destroy();
                }

                AdmobHelper.bannerAdView = new AdView(Cocos2dxActivity.getContext());
                AdmobHelper.bannerAdView.setAdUnitId(bannerId);
                AdmobHelper.bannerAdView.setAdSize(AdSize.SMART_BANNER);
                AdmobHelper.bannerAdView.setAdListener(new AdListener() {
                    public void onAdLoaded() {
                        AdmobHelper.callJS("onBannerLoaded");
                    }

                    public void onAdFailedToLoad(int code) {
                        AdmobHelper.callJS("onBannerFailedToLoad", new Object[] {new Integer(code)});
                    }

                    public void onAdOpened() {
                        AdmobHelper.callJS("onBannerOpened");
                    }
                });

                // 添加到底部
                FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT);
                layoutParams.gravity = Gravity.BOTTOM;
                Cocos2dxHelper.getActivity().addContentView(AdmobHelper.bannerAdView, layoutParams);
                AdmobHelper.bannerAdView.setVisibility(View.INVISIBLE);
            }
        });
    }

    /**
     * 创建插页广告
     * @param interstitialId
     */
    private static void createInterstitial(final String interstitialId) {
        Cocos2dxHelper.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AdmobHelper.interstitialAd = new InterstitialAd(Cocos2dxActivity.getContext());
                AdmobHelper.interstitialAd.setAdUnitId(interstitialId);
                AdmobHelper.interstitialAd.setAdListener(new AdListener() {
                    @Override
                    public void onAdLoaded() {
                        AdmobHelper.callJS("onInterstitialLoaded");
                    }

                    @Override
                    public void onAdFailedToLoad(int errorCode) {
                        AdmobHelper.callJS("onInterstitialFailedToLoad", new Object[]{ new Integer(errorCode) });
                    }

                    @Override
                    public void onAdOpened() {
                        AdmobHelper.callJS("onInterstitialOpened");
                    }

                    @Override
                    public void onAdLeftApplication() {
                        // Code to be executed when the user has left the app.
                    }

                    @Override
                    public void onAdClosed() {
                        AdmobHelper.callJS("onInterstitialClosed");
                    }

                });
            }
        });
    }

    /**
     * 预加载视频
     */
    public static void preloadVideo(final String adId) {
        Cocos2dxHelper.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AdmobHelper.rewardedVideoAd.loadAd(adId,
                        new AdRequest.Builder().addTestDevice(AdmobHelper.testDeviceID).build());
            }
        });
    }

    /**
     * 显示视频
     */
    public static void showVideo() {
        Cocos2dxHelper.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (AdmobHelper.rewardedVideoAd.isLoaded()) {
                    AdmobHelper.rewardedVideoAd.show();
                }
                else {
                }
            }
        });
    }

    /**
     * 预加载横幅
     */
    public static void preloadBanner() {
        Cocos2dxHelper.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AdmobHelper.bannerAdView.loadAd(new AdRequest.Builder().addTestDevice(AdmobHelper.testDeviceID).build());
            }
        });
    }

    /**
     * 显示横幅
     */
    public static void showBanner() {
        Cocos2dxHelper.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AdmobHelper.bannerAdView.setVisibility(View.VISIBLE);
            }
        });
    }

    /**
     * 隐藏横幅
     */
    public static void hideBanner() {
        Cocos2dxHelper.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AdmobHelper.bannerAdView.setVisibility(View.INVISIBLE);
            }
        });
    }

    /**
     * 预加载插页广告
     */
    public static void preloadInterstitial() {
        Cocos2dxHelper.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AdmobHelper.interstitialAd.loadAd(new AdRequest.Builder().addTestDevice(AdmobHelper.testDeviceID).build());
            }
        });
    }

    /**
     * 显示插页广告
     */
    public static void showInterstitial() {
        Cocos2dxHelper.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (AdmobHelper.interstitialAd.isLoaded()) {
                    AdmobHelper.interstitialAd.show();
                }
            }
        });
    }

    /**
     * 调用js脚本方法
     * @param method 方法名
     * @param args 参数列表, 以字符串的形式进行拼接
     */
    public static void callJS(final String method, final Object[] args) {
        Cocos2dxHelper.runOnGLThread(new Runnable() {
            @Override
            public void run() {
                // 拼接参数
                if (args != null && args.length > 0) {
                    String argStr = "";
                    for (int i = 0; i < args.length; i++) {
                        if (i != 0) {
                            argStr += ",";
                        }
                        if (args[i] instanceof String) {
                            argStr += String.format("'%s'", args[i]);
                        }
                        else if (args[i] instanceof Integer || args[i] instanceof Float) {
                            argStr += String.format("'%s'", args[i].toString());
                        }

                    }
                    Cocos2dxJavascriptJavaBridge.evalString(String.format("blade.platform.platform.%s(%s);", method, argStr));
                }
                else {
                    Cocos2dxJavascriptJavaBridge.evalString(String.format("blade.platform.platform.%s();", method));
                }
            }
        });
    }

    public static void callJS(final String method) {
        AdmobHelper.callJS(method, null);
    }

    public static void onResume() {
        if (Cocos2dxActivity.getContext() != null && AdmobHelper.rewardedVideoAd != null) {
            AdmobHelper.rewardedVideoAd.resume(Cocos2dxActivity.getContext());
        }
    }

    public static void onPause() {
        if (Cocos2dxActivity.getContext() != null && AdmobHelper.rewardedVideoAd != null) {
            AdmobHelper.rewardedVideoAd.pause(Cocos2dxActivity.getContext());
        }
    }

    public static void onDestroy() {
        if (Cocos2dxActivity.getContext() != null && AdmobHelper.rewardedVideoAd != null) {
            AdmobHelper.rewardedVideoAd.destroy(Cocos2dxActivity.getContext());
        }

        if (AdmobHelper.bannerAdView != null) {
            AdmobHelper.bannerAdView.destroy();
        }
    }
}
