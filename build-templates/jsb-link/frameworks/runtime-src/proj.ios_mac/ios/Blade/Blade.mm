//
//  Blade.mm
//  CocosCreator-Blade-mobile
//
//  Created by macpro on 2022/10/21.
//

#import "Blade.h"

#include "platform/CCApplication.h"
#include "base/CCScheduler.h"
#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#include "cocos2d.h"

@implementation Blade

+(void)callCocos: (NSString *) funName, ...NS_REQUIRES_NIL_TERMINATION {
        if (funName) {
            std::string fun = [funName UTF8String];
            std::string scriptStr = "";

            NSString *argsStr=nil;

            va_list list;
            NSString *arg=nil;

            va_start(list, funName);

            while ((arg=va_arg(list, NSString *))!=nil) {
                if (argsStr == nil) {
                    argsStr = [NSString stringWithFormat:@"\"%@\"",arg];
                } else {
                    argsStr = [NSString stringWithFormat:@"%@,\"%@\"",argsStr,arg];
                }
            }

            va_end(list);

            if (argsStr==nil) {
                argsStr=@"";
            }

            std::string funArgs = [argsStr UTF8String];

            scriptStr = cocos2d::StringUtils::format("blade.platform.get().%s(%s);",fun.c_str(),funArgs.c_str());

            cocos2d::Application::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
                se::ScriptEngine::getInstance()->evalString(scriptStr.c_str());
            });
        }
}

+ (void)copyToClipBoard:(NSString*) message{
    //获得ios的剪切板
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    //改变剪切板的内容
    pasteboard.string = message;
    return;
}


@end
