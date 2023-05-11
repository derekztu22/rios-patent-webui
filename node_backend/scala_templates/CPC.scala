// 这里创建一个spark的DataFrame
val df = spark
  .read // 表示读文件
  .option("header", "true") // 设置参数header=true，表示有表头
  .option("multiline", "true") // 设置参数multiline=true，表示一个单元格可能有多行
  // 使用"来转义"
  .option("escape", "\"") // 设置escape="\""，表示使用双引号转义双引号。意思在csv文件里""表示"
  .csv("patent/patent_cleaned.csv") // 读取csv文件



//filter DF based on RPC number RDD, 然后看高频词
val filteredRDDnm = df.rdd.filter(row => row.getString(1).contains("R01A02"))
val filteredDFnm = spark.createDataFrame(filteredRDDnm, df.schema)
filteredDFnm.show()