val df1 = spark
    .read // 表示读文件
    .option("header", "true") // 设置参数header=true，表示有表头
    .option("multiline", "true") // 设置参数multiline=true，表示一个单元格可能有多行
    // 使用"来转义"
    .option("escape", "\"") // 设置escape="\""，表示使用双引号转义双引号。意思在csv文件里""表示"
    .csv("/patent/uspto/csv/g_assignee_disambiguated.csv") // 读取csv文件
val df2 = spark
    .read // 表示读文件
    .option("header", "true") // 设置参数header=true，表示有表头
    .option("multiline", "true") // 设置参数multiline=true，表示一个单元格可能有多行
    // 使用"来转义"
    .option("escape", "\"") // 设置escape="\""，表示使用双引号转义双引号。意思在csv文件里""表示"
    .csv("/patent/uspto/csv/g_patent.csv") // 读取csv文件
val df = df1.join(df2, Seq("patent_id"), "inner")

val rowdfnumber= df.count()
println(s"The number of rows in the DataFrame is $rowdfnumber.")



//filter only those patents with assignee===ARM
val filtered = df.filter(col("disambig_assignee_organization").contains("Arm Limited"))

import org.apache.spark.sql.functions.{col, year}
val filteredDFbytime = filtered.filter(year(col("patent_date")) < 2005)
    .orderBy(col("patent_date").desc)


val sortedstring = filteredDFbytime.limit(100).toJSON.collectAsList().toString()
sortedstring