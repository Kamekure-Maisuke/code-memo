# Javaメモ
## 学生時メモ移行
### テキストベース　Githubで管理
※ファイル名は「Test.java」
```java
public class Test{    	//一つのファイルにpublicクラスは一つしか持てない。
	public static void main(String[] args){
    	Car.getInfo();
    	System.out.println("hello");
    	String[] arr = {"oono","taisuke","dayo"};
    	int abc = 78;
    	if(abc > 79){
        	System.out.println("wonderfull");
    	}else{
        	System.out.println("baka");
    	}
    	for(String i:arr){	//拡張for文
        	System.out.println(i);
    	}
    	Banana banana1 = new Banana();
    	banana1.aisatu();
    	banana1.sayToudo();
    	Car car1 = new Car(5,6,7);	//オブジェクト作成
    	car1.resultCar();
    	Car.getInfo();
    	Bmw car2 = new Bmw(3,4,5,6);
    	car2.resultCar();
    	car2.resultBmw();
    	JapaneseFood susi = new JapaneseFood();
    	AmericanFood humberger = new AmericanFood();
    	susi.sayDelicious();
    	humberger.sayDelicious();
	}
}
interface Fruit{   	//インターフェース作成
	double Version =1.5;
	void sayToudo();
	public default void aisatu(){
        	System.out.println("hello how are you");
	}
}
class Banana implements Fruit{	//インターフェースの実装
	@Override
	public void sayToudo() {
	System.out.println("toudo : " + Version);
    }
}
abstract class Food{   //抽象クラス作成
	public abstract void sayDelicious();	//抽象メソッド
}
class JapaneseFood extends Food{  
	@Override
	public void sayDelicious(){
    	System.out.println("oisii");
	}
}
class AmericanFood extends Food{
	@Override
	public void sayDelicious(){
    	System.out.println("delicious");
	}
}
class Car{        	//クラス作成
	int x;
	int y;
	int z;
	private static int count = 0;   	//クラスフィールド作成
	static{          	//クラスイニシャライザー	コンストラクタの前に実行
    	System.out.println("Initializer");
	}
	{
    	System.out.println("Instance Initializer");	//インスタンスイニシャライザー   コンストラクタの後に実行
	}
	public Car(int x,int y,int z){	//コンストラクタ作成
    	this.x = x;
    	this.y = y;
    	this.z = z;
    	Car.count++;
        	System.out.println("Constructor");
	}
	public static void getInfo(){  	//クラスメソッド作成	※staticとvoidを忘れない
    	System.out.println("classValue :" + Car.count);
	}
	public int getZ(){	//getter作成	基本的に自動作成可能
    	return this.z;
	}
	public void setX(int x){ 	//setter作成   基本的に自動作成可能
    	this.x = x;
	}
	void resultCar(){    	//メソッド作成
    	System.out.println("result : " + x * y * z);
	}
}
class Bmw extends Car{ 	//継承クラス作成
	int a;
	public Bmw(int x,int y,int z,int a){
    	super(x,y,z);
    	this.a = a;
	}
	void resultBmw(){
    	System.out.println("resultBmw : " + a);
	}
	@Override
	void resultCar(){    	//オーバーライド
    	System.out.println("result : " + x * y * z * a);
	}
}
```
※ファイル名は、「Test2.java」
```java
import java.util.*;
import java.util.Random;
public class Test2{
	public static void main(String[] args){
    	double x = 5.98;
    	Random r = new Random();
    	System.out.println(Math.ceil(x));	//切り上げ
    	System.out.println(Math.floor(x));   //切り捨て
    	System.out.println(Math.round(x));   //四捨五入
    	System.out.println(Math.PI);     	//円周率
    	System.out.println(r.nextInt(4));	//ランダム関数  上のインポートを入れないとできない。
    	List<Integer> arr = new ArrayList<Integer>(); 	//ArrayList作成   これも同じく上のインポートを入れる
    	arr.add(3);
    	arr.add(4);
    	arr.add(5);
    	System.out.println(arr.get(0));
    	HashMap<String,String> group = new HashMap<String,String>();  //HashMap作成
    	group.put("oono","taisuke");
    	group.put("kubo","siori");
    	group.put("siraisi","mai");
    	System.out.println(group.get("oono"));
	}
}
```