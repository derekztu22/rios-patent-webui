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
    .csv("/patent/uspto/csv/g_cpc_current.csv") // 读取csv文件
val df = df1.join(df2, Seq("patent_id"), "inner")

//filter only those patents with assignee===MIPS
val filteredDF = df.filter(col("disambig_assignee_organization").like("%MIPS%"))

//count the number of rows for each value in the "cpc.code" column
val rowCounts = filteredDF.groupBy("cpc_group").count()

//sort in descending order
val sortedCounts = rowCounts.orderBy(desc("count"))
val rowdfnumber = filteredDF.count()
println(s"The number of rows in the DataFrame is $rowdfnumber.")

val sortedstring =sortedCounts.limit(100).toJSON.collectAsList().toString()
sortedstring