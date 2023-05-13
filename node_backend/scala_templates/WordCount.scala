val df = spark
    .read // 表示读文件
    .option("header", "true") // 设置参数header=true，表示有表头
    .option("multiline", "true") // 设置参数multiline=true，表示一个单元格可能有多行
    // 使用"来转义"
    .option("escape", "\"") // 设置escape="\""，表示使用双引号转义双引号。意思在csv文件里""表示"
    .csv("patent/patent_cleaned.csv") // 读取csv文件

df.show() // 向控制台打印Dataframe

// 将Dataframe的每一行的第3列（摘要）第4列（描述），（从0开始计数）连接成一个字符串
val lines = df.map(
    line => line(3).toString + " " + line(4).toString
)

val words = lines.flatMap(_.split(" ")) // 根据空格拆分字符串成一个个的单词
words.show()

val wordsGroup = words.groupBy("value") // 根据"value"这一个column分组

val wordCount = wordsGroup
    .count() // 统计单词出现的频率
    .sort(col("count").desc) // 根据count这一个column降序排列

wordCount.show()

val sortedstring = wordCount.limit(100).toJSON.collectAsList().toString()
sortedstring