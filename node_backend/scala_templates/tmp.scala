2023-05-10 16:21:31,715 INFO spark.SparkContext: Running Spark version 3.2.4
2023-05-10 16:21:31,787 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
2023-05-10 16:21:31,867 INFO resource.ResourceUtils: ==============================================================
2023-05-10 16:21:31,867 INFO resource.ResourceUtils: No custom resources configured for spark.driver.
2023-05-10 16:21:31,868 INFO resource.ResourceUtils: ==============================================================
2023-05-10 16:21:31,868 INFO spark.SparkContext: Submitted application: WordCount SQL Application
2023-05-10 16:21:31,944 INFO resource.ResourceProfile: Default ResourceProfile created, executor resources: Map(cores -> name: cores, amount: 1, script: , vendor: , memory -> name: memory, amount: 1024, script: , vendor: , offHeap -> name: offHeap, amount: 0, script: , vendor: ), task resources: Map(cpus -> name: cpus, amount: 1.0)
2023-05-10 16:21:31,949 INFO resource.ResourceProfile: Limiting resource is cpu
2023-05-10 16:21:31,950 INFO resource.ResourceProfileManager: Added ResourceProfile id: 0
2023-05-10 16:21:32,009 INFO spark.SecurityManager: Changing view acls to: dwfeng,root
2023-05-10 16:21:32,009 INFO spark.SecurityManager: Changing modify acls to: dwfeng,root
2023-05-10 16:21:32,009 INFO spark.SecurityManager: Changing view acls groups to: 
2023-05-10 16:21:32,010 INFO spark.SecurityManager: Changing modify acls groups to: 
2023-05-10 16:21:32,010 INFO spark.SecurityManager: SecurityManager: authentication disabled; ui acls disabled; users  with view permissions: Set(dwfeng, root); groups with view permissions: Set(); users  with modify permissions: Set(dwfeng, root); groups with modify permissions: Set()
2023-05-10 16:21:32,233 INFO util.Utils: Successfully started service 'sparkDriver' on port 43189.
2023-05-10 16:21:32,260 INFO spark.SparkEnv: Registering MapOutputTracker
2023-05-10 16:21:32,290 INFO spark.SparkEnv: Registering BlockManagerMaster
2023-05-10 16:21:32,316 INFO storage.BlockManagerMasterEndpoint: Using org.apache.spark.storage.DefaultTopologyMapper for getting topology information
2023-05-10 16:21:32,317 INFO storage.BlockManagerMasterEndpoint: BlockManagerMasterEndpoint up
2023-05-10 16:21:32,320 INFO spark.SparkEnv: Registering BlockManagerMasterHeartbeat
2023-05-10 16:21:32,344 INFO storage.DiskBlockManager: Created local directory at /tmp/blockmgr-bc9b874e-c67b-4177-8a71-6a6c822d103d
2023-05-10 16:21:32,361 INFO memory.MemoryStore: MemoryStore started with capacity 408.9 MiB
2023-05-10 16:21:32,377 INFO spark.SparkEnv: Registering OutputCommitCoordinator
2023-05-10 16:21:32,453 INFO util.log: Logging initialized @1706ms to org.sparkproject.jetty.util.log.Slf4jLog
2023-05-10 16:21:32,526 INFO server.Server: jetty-9.4.44.v20210927; built: 2021-09-27T23:02:44.612Z; git: 8da83308eeca865e495e53ef315a249d63ba9332; jvm 1.8.0_372-b07
2023-05-10 16:21:32,549 INFO server.Server: Started @1804ms
2023-05-10 16:21:32,591 INFO server.AbstractConnector: Started ServerConnector@1407c3b4{HTTP/1.1, (http/1.1)}{0.0.0.0:4040}
2023-05-10 16:21:32,591 INFO util.Utils: Successfully started service 'SparkUI' on port 4040.
2023-05-10 16:21:32,615 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@26d10f2e{/jobs,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,617 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@25243bc1{/jobs/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,618 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@2e6ee0bc{/jobs/job,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,621 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@420bc288{/jobs/job/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,621 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@308a6984{/stages,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,622 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@7a34b7b8{/stages/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,623 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@3be8821f{/stages/stage,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,624 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@74a9c4b0{/stages/stage/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,625 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@1c05a54d{/stages/pool,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,626 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@5fd9b663{/stages/pool/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,626 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@10567255{/storage,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,627 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@1c4ee95c{/storage/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,627 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@5aa360ea{/storage/rdd,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,628 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@e27ba81{/storage/rdd/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,629 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@1556f2dd{/environment,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,630 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@62577d6{/environment/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,630 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@6b5f8707{/executors,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,631 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@5a12c728{/executors/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,632 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@6e5bfdfc{/executors/threadDump,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,633 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@71652c98{/executors/threadDump/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,645 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@60b85ba1{/static,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,646 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@3fcdcf{/,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,647 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@46292372{/api,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,648 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@1e34c607{/jobs/job/kill,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,649 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@36b6964d{/stages/stage/kill,null,AVAILABLE,@Spark}
2023-05-10 16:21:32,650 INFO ui.SparkUI: Bound SparkUI to 0.0.0.0, and started at http://mn1.hadoop.rioslab.org:4040
2023-05-10 16:21:32,664 INFO spark.SparkContext: Added JAR file:/work/stu/dwfeng/RIOS/rios-patent-spark/spark/target/spark-0.1-SNAPSHOT.jar at spark://mn1.hadoop.rioslab.org:43189/jars/spark-0.1-SNAPSHOT.jar with timestamp 1683706891711
2023-05-10 16:21:32,873 INFO executor.Executor: Starting executor ID driver on host mn1.hadoop.rioslab.org
2023-05-10 16:21:32,894 INFO executor.Executor: Fetching spark://mn1.hadoop.rioslab.org:43189/jars/spark-0.1-SNAPSHOT.jar with timestamp 1683706891711
2023-05-10 16:21:32,952 INFO client.TransportClientFactory: Successfully created connection to mn1.hadoop.rioslab.org/10.8.6.2:43189 after 31 ms (0 ms spent in bootstraps)
2023-05-10 16:21:32,959 INFO util.Utils: Fetching spark://mn1.hadoop.rioslab.org:43189/jars/spark-0.1-SNAPSHOT.jar to /tmp/spark-67786023-844b-4ea9-99cc-805920616705/userFiles-fe7134a0-f6ba-4795-bcef-d97a787aad8f/fetchFileTemp1161359083230794618.tmp
2023-05-10 16:21:33,003 INFO executor.Executor: Adding file:/tmp/spark-67786023-844b-4ea9-99cc-805920616705/userFiles-fe7134a0-f6ba-4795-bcef-d97a787aad8f/spark-0.1-SNAPSHOT.jar to class loader
2023-05-10 16:21:33,010 INFO util.Utils: Successfully started service 'org.apache.spark.network.netty.NettyBlockTransferService' on port 45607.
2023-05-10 16:21:33,010 INFO netty.NettyBlockTransferService: Server created on mn1.hadoop.rioslab.org:45607
2023-05-10 16:21:33,012 INFO storage.BlockManager: Using org.apache.spark.storage.RandomBlockReplicationPolicy for block replication policy
2023-05-10 16:21:33,019 INFO storage.BlockManagerMaster: Registering BlockManager BlockManagerId(driver, mn1.hadoop.rioslab.org, 45607, None)
2023-05-10 16:21:33,025 INFO storage.BlockManagerMasterEndpoint: Registering block manager mn1.hadoop.rioslab.org:45607 with 408.9 MiB RAM, BlockManagerId(driver, mn1.hadoop.rioslab.org, 45607, None)
2023-05-10 16:21:33,031 INFO storage.BlockManagerMaster: Registered BlockManager BlockManagerId(driver, mn1.hadoop.rioslab.org, 45607, None)
2023-05-10 16:21:33,034 INFO storage.BlockManager: Initialized BlockManager: BlockManagerId(driver, mn1.hadoop.rioslab.org, 45607, None)
2023-05-10 16:21:33,177 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@213860b8{/metrics/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:33,400 INFO internal.SharedState: Setting hive.metastore.warehouse.dir ('null') to the value of spark.sql.warehouse.dir.
2023-05-10 16:21:33,438 INFO internal.SharedState: Warehouse path is 'file:/work/stu/dwfeng/RIOS/rios-patent-spark/spark/spark-warehouse'.
2023-05-10 16:21:33,452 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@4df39a88{/SQL,null,AVAILABLE,@Spark}
2023-05-10 16:21:33,453 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@3bec2275{/SQL/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:33,453 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@5f18f9d2{/SQL/execution,null,AVAILABLE,@Spark}
2023-05-10 16:21:33,454 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@58b67519{/SQL/execution/json,null,AVAILABLE,@Spark}
2023-05-10 16:21:33,456 INFO handler.ContextHandler: Started o.s.j.s.ServletContextHandler@7c1c5936{/static/sql,null,AVAILABLE,@Spark}
2023-05-10 16:21:34,996 INFO datasources.InMemoryFileIndex: It took 77 ms to list leaf files for 1 paths.
2023-05-10 16:21:35,129 INFO memory.MemoryStore: Block broadcast_0 stored as values in memory (estimated size 347.0 KiB, free 408.6 MiB)
2023-05-10 16:21:35,178 INFO memory.MemoryStore: Block broadcast_0_piece0 stored as bytes in memory (estimated size 33.4 KiB, free 408.5 MiB)
2023-05-10 16:21:35,183 INFO storage.BlockManagerInfo: Added broadcast_0_piece0 in memory on mn1.hadoop.rioslab.org:45607 (size: 33.4 KiB, free: 408.9 MiB)
2023-05-10 16:21:35,191 INFO spark.SparkContext: Created broadcast 0 from csv at App.scala:29
2023-05-10 16:21:35,518 INFO input.FileInputFormat: Total input files to process : 1
2023-05-10 16:21:35,521 INFO input.FileInputFormat: Total input files to process : 1
2023-05-10 16:21:35,580 INFO spark.SparkContext: Starting job: csv at App.scala:29
2023-05-10 16:21:35,604 INFO scheduler.DAGScheduler: Got job 0 (csv at App.scala:29) with 1 output partitions
2023-05-10 16:21:35,604 INFO scheduler.DAGScheduler: Final stage: ResultStage 0 (csv at App.scala:29)
2023-05-10 16:21:35,604 INFO scheduler.DAGScheduler: Parents of final stage: List()
2023-05-10 16:21:35,606 INFO scheduler.DAGScheduler: Missing parents: List()
2023-05-10 16:21:35,611 INFO scheduler.DAGScheduler: Submitting ResultStage 0 (MapPartitionsRDD[2] at csv at App.scala:29), which has no missing parents
2023-05-10 16:21:35,638 INFO memory.MemoryStore: Block broadcast_1 stored as values in memory (estimated size 7.2 KiB, free 408.5 MiB)
2023-05-10 16:21:35,643 INFO memory.MemoryStore: Block broadcast_1_piece0 stored as bytes in memory (estimated size 4.1 KiB, free 408.5 MiB)
2023-05-10 16:21:35,645 INFO storage.BlockManagerInfo: Added broadcast_1_piece0 in memory on mn1.hadoop.rioslab.org:45607 (size: 4.1 KiB, free: 408.9 MiB)
2023-05-10 16:21:35,645 INFO spark.SparkContext: Created broadcast 1 from broadcast at DAGScheduler.scala:1474
2023-05-10 16:21:35,663 INFO scheduler.DAGScheduler: Submitting 1 missing tasks from ResultStage 0 (MapPartitionsRDD[2] at csv at App.scala:29) (first 15 tasks are for partitions Vector(0))
2023-05-10 16:21:35,664 INFO scheduler.TaskSchedulerImpl: Adding task set 0.0 with 1 tasks resource profile 0
2023-05-10 16:21:35,725 INFO scheduler.TaskSetManager: Starting task 0.0 in stage 0.0 (TID 0) (mn1.hadoop.rioslab.org, executor driver, partition 0, NODE_LOCAL, 7561 bytes) taskResourceAssignments Map()
2023-05-10 16:21:35,752 INFO executor.Executor: Running task 0.0 in stage 0.0 (TID 0)
2023-05-10 16:21:36,050 INFO rdd.BinaryFileRDD: Input split: Paths:/user/root/patent/patent_cleaned.csv:0+93451453
2023-05-10 16:21:36,231 INFO executor.Executor: Finished task 0.0 in stage 0.0 (TID 0). 1149 bytes result sent to driver
2023-05-10 16:21:36,246 INFO scheduler.TaskSetManager: Finished task 0.0 in stage 0.0 (TID 0) in 534 ms on mn1.hadoop.rioslab.org (executor driver) (1/1)
2023-05-10 16:21:36,250 INFO scheduler.TaskSchedulerImpl: Removed TaskSet 0.0, whose tasks have all completed, from pool 
2023-05-10 16:21:36,260 INFO scheduler.DAGScheduler: ResultStage 0 (csv at App.scala:29) finished in 0.629 s
2023-05-10 16:21:36,264 INFO scheduler.DAGScheduler: Job 0 is finished. Cancelling potential speculative or zombie tasks for this job
2023-05-10 16:21:36,264 INFO scheduler.TaskSchedulerImpl: Killing all running tasks in stage 0: Stage finished
2023-05-10 16:21:36,266 INFO scheduler.DAGScheduler: Job 0 finished: csv at App.scala:29, took 0.685972 s
2023-05-10 16:21:37,321 INFO storage.BlockManagerInfo: Removed broadcast_0_piece0 on mn1.hadoop.rioslab.org:45607 in memory (size: 33.4 KiB, free: 408.9 MiB)
2023-05-10 16:21:37,329 INFO storage.BlockManagerInfo: Removed broadcast_1_piece0 on mn1.hadoop.rioslab.org:45607 in memory (size: 4.1 KiB, free: 408.9 MiB)
2023-05-10 16:21:38,234 INFO datasources.FileSourceStrategy: Pushed Filters: 
2023-05-10 16:21:38,235 INFO datasources.FileSourceStrategy: Post-Scan Filters: 
2023-05-10 16:21:38,237 INFO datasources.FileSourceStrategy: Output Data Schema: struct<pub_num: string, rpc_num: string, title: string, abstract: string, description: string ... 3 more fields>
2023-05-10 16:21:38,283 INFO memory.MemoryStore: Block broadcast_2 stored as values in memory (estimated size 342.3 KiB, free 408.6 MiB)
2023-05-10 16:21:38,293 INFO memory.MemoryStore: Block broadcast_2_piece0 stored as bytes in memory (estimated size 33.2 KiB, free 408.5 MiB)
2023-05-10 16:21:38,295 INFO storage.BlockManagerInfo: Added broadcast_2_piece0 in memory on mn1.hadoop.rioslab.org:45607 (size: 33.2 KiB, free: 408.9 MiB)
2023-05-10 16:21:38,296 INFO spark.SparkContext: Created broadcast 2 from rdd at App.scala:34
2023-05-10 16:21:38,307 INFO execution.FileSourceScanExec: Planning scan with bin packing, max size: 4194304 bytes, open cost is considered as scanning 4194304 bytes.
Exception in thread "main" java.lang.BootstrapMethodError: java.lang.NoClassDefFoundError: scala/Serializable
        at org.rioslab.APP$.main(App.scala:34)
        at org.rioslab.APP.main(App.scala)
        at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
        at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
        at java.lang.reflect.Method.invoke(Method.java:498)
        at org.apache.spark.deploy.JavaMainApplication.start(SparkApplication.scala:52)
        at org.apache.spark.deploy.SparkSubmit.org$apache$spark$deploy$SparkSubmit$$runMain(SparkSubmit.scala:966)
        at org.apache.spark.deploy.SparkSubmit.doRunMain$1(SparkSubmit.scala:191)
        at org.apache.spark.deploy.SparkSubmit.submit(SparkSubmit.scala:214)
        at org.apache.spark.deploy.SparkSubmit.doSubmit(SparkSubmit.scala:90)
        at org.apache.spark.deploy.SparkSubmit$$anon$2.doSubmit(SparkSubmit.scala:1054)
        at org.apache.spark.deploy.SparkSubmit$.main(SparkSubmit.scala:1063)
        at org.apache.spark.deploy.SparkSubmit.main(SparkSubmit.scala)
Caused by: java.lang.NoClassDefFoundError: scala/Serializable
        ... 14 more
Caused by: java.lang.ClassNotFoundException: scala.Serializable
        at java.net.URLClassLoader.findClass(URLClassLoader.java:387)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:418)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:351)
        ... 14 more
2023-05-10 16:21:38,348 INFO spark.SparkContext: Invoking stop() from shutdown hook
2023-05-10 16:21:38,363 INFO server.AbstractConnector: Stopped Spark@1407c3b4{HTTP/1.1, (http/1.1)}{0.0.0.0:4040}
2023-05-10 16:21:38,367 INFO ui.SparkUI: Stopped Spark web UI at http://mn1.hadoop.rioslab.org:4040
2023-05-10 16:21:38,381 INFO spark.MapOutputTrackerMasterEndpoint: MapOutputTrackerMasterEndpoint stopped!
2023-05-10 16:21:38,401 INFO memory.MemoryStore: MemoryStore cleared
2023-05-10 16:21:38,401 INFO storage.BlockManager: BlockManager stopped
2023-05-10 16:21:38,409 INFO storage.BlockManagerMaster: BlockManagerMaster stopped
2023-05-10 16:21:38,414 INFO scheduler.OutputCommitCoordinator$OutputCommitCoordinatorEndpoint: OutputCommitCoordinator stopped!
2023-05-10 16:21:38,428 INFO spark.SparkContext: Successfully stopped SparkContext
2023-05-10 16:21:38,428 INFO util.ShutdownHookManager: Shutdown hook called
2023-05-10 16:21:38,429 INFO util.ShutdownHookManager: Deleting directory /tmp/spark-67786023-844b-4ea9-99cc-805920616705
2023-05-10 16:21:38,433 INFO util.ShutdownHookManager: Deleting directory /tmp/spark-efc38a8d-7ab1-4926-8e29-9a0a23f3ad91