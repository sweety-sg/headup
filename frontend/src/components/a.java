import java.io.*;
import java.util.*;


public class LinkedList {

    Node head;
    Node end;
    static class Node {
        int key;
        Node next;
        
        Node(int d)
        {
            key = d;
            next = null;
        }
    }

   
    public static LinkedList push(LinkedList list, int key)
    {
       
        Node new = new Node(key);
        new.next = null;

        
        if (list.head == null) {
            list.head = new;
            list.end = new;
        }
        else {
            Node last = list.head;
            while (last.next != null) {
                last = last.next;
            }  
            last.next = new;
            list.end = new;
        }

        
        return list;
    }

    public static LinkedList pop(LinkedList linked)
    {
       
        if(linked.head!=null){
            if(linked.head.next!=null){
            Node prev = linked.head;
            Node curr = linked.head.next;
           
            while(curr.next!=null){
                prev = curr;
                curr = curr.next;
            }
                prev.next = null;
                linked.end = prev;
         }else{
                linked.head = null;
                linked.end = null;
            }
        }
        return linked;
    }
    
    public static Boolean empty(LinkedList linked){
        if (linked.head == null){
            return true;
        }
        return false;
    }

    
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int e = sc.nextInt();
        
        
        int array[] = new int[n];
        for(int i=0;i<n;i++){
            array[i] = 1;
        }
        LinkedList list[] = new LinkedList[n];
        
        for(int i=0;i<n;i++){
            list[i] = new LinkedList();
        }
        
        for(int i=0;i<e;i++){
            int x = sc.nextInt();
            int y = sc.nextInt();
            
            list[x] = push(list[x],y);
        }
        
        LinkedList ans = new LinkedList();
        
        int k = sc.nextInt();
        
        ans = push(ans , k);
        array[k] = 2;

        while(!empty(ans)){
            int k = ans.end.key;
            System.out.print(k + " ");
            ans = pop(ans);
            array[k] = 3;
            
            Node curr = list[k].end;
            while(curr!=null){
                int val = curr.key;
                if(array[val]==1){
                    ans = push(ans , val);
                    array[val]= 2;
                }
                list[k] = pop(list[k]);
                curr = list[k].end;
            }
        }
    }
}