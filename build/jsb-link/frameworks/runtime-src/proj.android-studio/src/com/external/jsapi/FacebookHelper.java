package com.external.jsapi;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginBehavior;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxHelper;

import java.util.Arrays;

public class FacebookHelper {

    private static boolean inited =false;

    static void init(){
        if (FacebookHelper.inited==false) {
         FacebookHelper.inited=true;
            CallbackManager callbackManager = CallbackManager.Factory.create();
            LoginManager.getInstance().registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
                @Override
                public void onSuccess(LoginResult loginResult) {
                    System.out.print("登录成功: " + loginResult.getAccessToken().getToken());
                    loginResult.getAccessToken().getApplicationId();
                    loginResult.getAccessToken().getUserId();
                }

                @Override
                public void onCancel() {
                    System.out.print("登录取消");
                }

                @Override
                public void onError(FacebookException error) {
                    System.out.print("登录错误");
                }

            });
        }
    }

    public static   void facebookLogin() {
        if (CheckApkExist.checkApkExist(Cocos2dxActivity.getContext(),"com.facebook.katana")) {
            FacebookHelper.init();
            LoginManager.getInstance().setLoginBehavior(LoginBehavior.WEB_ONLY);
            // 发起登录
            LoginManager.getInstance().logInWithReadPermissions(Cocos2dxHelper.getActivity(), Arrays.asList("public_profile", "user_friends"));
        }else {
            System.out.print("未安装Facebook");
        }
     }

}
