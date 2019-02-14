# 乃木坂検索
# 楽天API使用

require 'net/http'
require 'uri'
require 'pp'
require 'json'

time = Time.now
time = time.strftime("取得時刻 : %Y年%m月%d日%H時%M分%S秒")
url = URI.parse(URI.escape('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20140222?applicationId=1044477890616064296&keyword=乃木坂'))
res = Net::HTTP.start(url.host, url.port, use_ssl: true){|http|
    http.get(url.path + "?" + url.query);
}
obj = JSON.parse(res.body)
# 出力結果
puts "取得日時 : #{time}"
puts "<table border=1>"
obj['Items'].each{|itemObj|
    item = itemObj['Item']
    if ! item['mediumImageUrls'][0]
        next
    end
    puts <<_EOT_;
<tr>
    <td>
        <img src="#{item['mediumImageUrls'][0]['imageUrl']}"/>
    </td>
    <td>
        #{item['itemName']}
    </td>
</tr>
_EOT_
}
puts "</table>"