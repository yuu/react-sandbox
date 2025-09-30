import parse from "html-react-parser";
import twitter from "twitter-text";

const UserMap = {
    kuzuha: "葛葉",
    kanae: "叶",
};

const AutoLinkConvertDisplayName = () => {
    const tweet = "link @kuzuha, and @kanae please #request";
    const indicates = twitter.extractEntitiesWithIndices(tweet);
    const convertedDisplayname = indicates.map((indicate) => {
        if (indicate.screenName) {
            return {
                ...indicate,
                screenName: UserMap[indicate.screenName],
            };
        }
        return indicate;
    });

    return (
        <div>
            <p>「{tweet}」</p>
            {parse(twitter.autoLinkEntities(tweet, convertedDisplayname))}
        </div>
    );
};

export const TwitterText = () => {
    return (
        <div>
            <h1>Twitter Text</h1>
            <h2>html escape</h2>
            <div>{parse(twitter.htmlEscape("#hello < @world >"))}</div>
            <h2>メンション抽出</h2>
            <div>
                <p>「Mentioning @twitter and @jack」</p>
                {twitter
                    .extractMentions("Mentioning @twitter and @jack")
                    .join(", ")}
            </div>
            <h2>リンク化 for username and hashtag</h2>
            <div>
                {parse(
                    twitter.autoLink("link @user, please #request", {
                        hashtagUrlBase: "https://example.com?search=",
                        usernameUrlBase: "https://example.com?user=",
                    }),
                )}
            </div>
            <h2>リンク化 for username converted display name (無理やり)</h2>
            <div>
                <AutoLinkConvertDisplayName />
            </div>
            <h2>リンク化 for url</h2>
            <div>
                {parse(
                    twitter.autoLink(
                        "link @user, and expand url... http://t.co/0JG5Mcq",
                        {
                            urlEntities: [
                                {
                                    url: "http://t.co/0JG5Mcq",
                                    display_url: "https://hoge.com",
                                    expanded_url:
                                        "http://blog.twitter.com/2011/05/twitter-for-mac-update.html",
                                    indices: [30, 48],
                                },
                            ],
                        },
                    ),
                )}
            </div>
        </div>
    );
};
